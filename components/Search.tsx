// Components/Search.js

import React, { useState, useEffect , useRef} from 'react'

import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  SafeAreaView
} from 'react-native'
import { connect } from 'react-redux';

import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import FilmList from './FilmList'



const Search = (props: any) => {
  const searchedText = useRef("star")
  const page = useRef(0);
  const totalPages = useRef(0);
  const [films, setFilms] = useState([]) 
  const [isLoading, setIsLoading] = useState(false)
  

  useEffect(() => {    
    _loadFilms()
  }, []) //[] : indicate to re render component only on mount et unmount
 
  const _loadFilms = () => {
    if (searchedText.current.length > 0) {
      setIsLoading(true)
      getFilmsFromApiWithSearchedText(searchedText.current, page.current + 1).then(data => {        
        page.current = data.page;
        totalPages.current = data.total_pages;
        if(page.current == 1){
          setFilms(data.results); //reinitialiser le resultat liste
        }else{
          setFilms(films.concat(data.results));
        }
        setIsLoading(false);
      })
    }
  }

  const _searchTextInputChanged = (text : string) => {
    searchedText.current=text;
  }

  const _searchFilms = () => {
    page.current=0;
    totalPages.current=0;    
    _loadFilms();
  }

  

  const _displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }
  

  return (
    <SafeAreaView style={styles.main_container}>
    <View style={styles.main_container}>
      <TextInput 
        style={styles.textinput}
        placeholder='Titre du film'
        onChangeText={text => _searchTextInputChanged(text)}
        onSubmitEditing={() => _searchFilms()}
      />
      <Button title='Rechercher' onPress={() => _searchFilms()} />
      <FilmList
        films={films}
        navigation={props.navigation}
        page={page.current}
        totalPages={totalPages.current}
        loadFilms={_loadFilms}
        listeToPaginate={true}
      />
      {_displayLoading()}
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps=(state : any) =>{
  return {favoritesFilm : state.favoritesFilm}
}

export default connect(mapStateToProps)(Search)
