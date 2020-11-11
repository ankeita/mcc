import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import FilmItem from './FilmItem';
import {connect} from 'react-redux';

const FilmList = (props: any) => {
  //props du composant parent
  const films = props.films;
  const loadFilms: Function = props.loadFilms;
  const page: number = props.page;
  const totalPages: number = props.totalPages;
  const listeToPaginate: boolean = props.listeToPaginate;

  //states/props globaux
  const favoritesFilm: any[] = props.favoritesFilm;

  //variables locales

  //states locaux

  //functons locales
  const _displayDetailForFilm = (idFilm: number) => {
    props.navigation.navigate('FilmDetail', {idFilm: idFilm});
  };

  const _isFavoriteFilm = (idFilm: number) => {
    const foundFilm = favoritesFilm.find((f: any) => f.id === idFilm);

    return foundFilm !== undefined;
  };

  return (
    <View style={styles.main_container}>
      <FlatList
        data={films}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({item}) => (
          <FilmItem
            film={item}
            displayDetailForFilm={_displayDetailForFilm}
            isFavoriteFilm={_isFavoriteFilm(item.id)}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (listeToPaginate && page < totalPages) {
            loadFilms();
          }
        }}
        extraData={favoritesFilm} //LE flatList se re render que si "data" et "extradata" ont changé
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
});

const mapStateToProps = (state: any) => {
  return {favoritesFilm: state.toggleFavorite.favoritesFilm};
};

export default connect(mapStateToProps)(FilmList);
