// Components/Favorites.js

import React from 'react';
import { StyleSheet, Text } from 'react-native';

import FilmList from './FilmList'
import { connect } from 'react-redux';

const Favorites =(props : any)=>  {
    //states globaux
    const films= props.favoritesFilm;

    return (
      <FilmList
        films={films}
        navigation={props.navigation}  
        listeToPaginate={false}      
      />
    )
 
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },

})

const mapStateToProps=(state : any) =>{
	return {favoritesFilm : state.favoritesFilm}
  }

  export default connect(mapStateToProps)(Favorites);