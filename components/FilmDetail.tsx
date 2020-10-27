// Components/FilmDetail.js

import React, {useState, useEffect, useLayoutEffect} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image, Button,
    Share,
    Platform
} from 'react-native'

import moment from 'moment';
import numeral from 'numeral';
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {getFilmDetailFromApi, getImageFromAPi} from '../API/TMDBApi';
import {TOGGLE_FAVORITE} from './../Store/Actions/FavoritesFilmActionType';


const FilmDetail = (props:any  ) => {
    const [film,
        setFilm] = useState(undefined)
    const [isLoading,
        setLoading] = useState(true)

    //useLayoutEffect is called before useEffect, i need this for getting "film" needed in second useLayoutEffect
    useLayoutEffect(() => {

        getFilmDetailFromApi(props.route.params.idFilm).then(data => {
            setFilm(data)
            setLoading(false)            
        })

        
    }, [])//[] indique l'effect sera évoqué seulement au montage du composant

    useLayoutEffect(() => {       
            if (film != undefined && Platform.OS === 'android') { // Uniquement sur IOs et lorsque le film est chargé
        
                props.navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity
                        style={styles.share_touchable_floatingactionbutton}
                        onPress={() => _shareFilm()}>
                        <Image
                            style={styles.share_image}
                            source={require('../Images/ic_share.png')} />
                  </TouchableOpacity>
                ),
                });
            }
        
    }, [film]) //l'effect sera évoqué à chaque modification de props.navigation
    
    const _displayLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    const _toggleFavorite=()=>{
      const action = {type : TOGGLE_FAVORITE , value : film }
      
      //Ajout de l'action dans le store
      props.dispatch(action);

    }

    const _displayFavoriteImage=()=>{
      let imageSource = require("./../Images/ic_favorite.png"); //Coeur plein. Film est dans le favoris
      
      const favoritesFilm: any[] = props.favoritesFilm;
      const currentFilm = favoritesFilm.find((f: any) => f.id === film.id);

      if(currentFilm ===undefined){
        imageSource = require("./../Images/ic_favorite_border.png"); //Coeur vide, le film n'est dans les favoris
      }

      return (
        <Image source={imageSource} style={styles.favorite_image} />
      )
    }

    const _displayFilm = () => {
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{
                        uri: getImageFromAPi(film.backdrop_path)
                    }}/>
                    <Text style={styles.title_text}>{film.title}</Text>
                    <TouchableOpacity 
                      style={styles.favorite_container} 
                      onPress={() => _toggleFavorite()}>
                        {_displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}>
                        Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
                    </Text>
                    <Text style={styles.default_text}>
                        Note : {film.vote_average}
                        / 10
                    </Text>
                    <Text style={styles.default_text}>
                        Nombre de votes : {film.vote_count}
                    </Text>
                    <Text style={styles.default_text}>
                        Budget : {numeral(film.budget).format('0,0[.]00 $')}
                    </Text>
                    <Text style={styles.default_text}>
                        Genre(s) :{' '} {film
                            .genres
                            .map(function (genre : any) {
                                return genre.name
                            })
                            .join(' / ')}
                    </Text>
                    <Text style={styles.default_text}>
                        Companie(s) :{' '} {film
                            .production_companies
                            .map(function (company) {
                                return company.name
                            })
                            .join(' / ')}
                    </Text>
                </ScrollView>
            )
        }
    }

    const _shareFilm=()=>{
        Share.share({title : film.titre, message: film.overview});
    }

    const _displayFloatingActionButton = () => {
        if (film != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
          return (
            <TouchableOpacity
              style={styles.share_touchable_floatingactionbutton}
              onPress={() => _shareFilm()}>
              <Image
                style={styles.share_image}
                source={require('../Images/ic_share.png')} />
            </TouchableOpacity>
          )
        }
    }

    return (
        <View style={styles.main_container}>
            {_displayLoading()}
            {_displayFilm()}
            {_displayFloatingActionButton()}
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    },
    favorite_container:{
      alignItems : 'center',
    },
    favorite_image : {
      width: 40,
      height : 40
    },
    share_touchable_floatingactionbutton: {
        position: 'relative',
        width: 60,
        height: 60,
        right: 5,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems : 'center'
      },
      share_image: {
        width: 30,
        height: 30,
      }
})

const mapStateToProps = (state : any) => {
    return {favoritesFilm : state.favoritesFilm};
}

const mapDispatchToProps =(dispatchFunc : Function) => {
  return {dispatch : (action: any) => dispatchFunc(action)}
}

export default connect(mapStateToProps,mapDispatchToProps)(FilmDetail)
