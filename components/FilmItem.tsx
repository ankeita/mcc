import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getImageFromAPi } from '../API/TMDBApi'
import { connect } from 'react-redux';

import FadeIn from '../Animations/FadeIn';

const FilmItem = (props: any) => {
  const film : any = props.film;
  const displayDetailForFilm : Function = props.displayDetailForFilm;
  const isFavoriteFilm : Function = props.isFavoriteFilm;

  const _displayFavoriteImage=()=>{    
    if(isFavoriteFilm){
      let imageSource = require("./../Images/ic_favorite.png"); //Coeur plein. Film est dans le favoris
      return (        
        <Image source={imageSource} style={styles.favorite_image} />
      )
    }
   
  }
  
  return (
    <FadeIn>
    <TouchableOpacity onPress={() => displayDetailForFilm(film.id)}>       
      
      <View style={styles.main_container}>
        <Image
          style={styles.image}
          source={{ uri: getImageFromAPi(film.poster_path) }}
        />
        <View style={styles.content_container}>
          <View style={styles.title_vote_view}>
            {_displayFavoriteImage()}
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_view}>
            <Text style={styles.description_text} numberOfLines={6}>
              {film.overview}
            </Text>
          </View>
          <Text style={styles.date_sortie_text}>
            Sorti le {film.release_date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    </FadeIn>
  )
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 190
  },

  image: {
    height: 180,
    width: 120,
    margin: 5
  },

  content_container: {
    flex: 3,
    flexDirection: 'column'
  },

  title_vote_view: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },

  description_view: {
    flex: 7
  },

  date_sortie_text: {
    textAlign: 'right',
    flex: 1
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  title_text: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16
  },
  vote_text: {
    textAlign: 'right',
    fontSize: 16,
    color: 'gray'
  },
  favorite_image : {
    width: 20,
    height : 20
  }
})



export default FilmItem
