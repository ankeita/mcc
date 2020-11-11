// Components/Favorites.js

import React from 'react';
import {StyleSheet, View} from 'react-native';

import FilmList from './FilmList';
import {connect} from 'react-redux';
import Avatar from './Avatar';

const Favorites = (props: any) => {
  //states globaux
  const films = props.favoritesFilm;

  return (
    <View style={styles.main_container}>
      <View style={styles.avatar_container}>
        <Avatar />
      </View>
      <FilmList
        films={films}
        navigation={props.navigation}
        listeToPaginate={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  avatar_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state: any) => {
  return {favoritesFilm: state.toggleFavorite.favoritesFilm};
};

export default connect(mapStateToProps)(Favorites);
