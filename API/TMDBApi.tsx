const API_TOKEN = 'afeea3c9ed94df8d446e313fac1170a4';

export const getFilmsFromApiWithSearchedText = (
  text: string,
  page: number,
): Promise<any> => {
  const url =
    'https://api.themoviedb.org/3/search/movie?api_key=' +
    API_TOKEN +
    '&language=fr&query=' +
    text +
    '&page=' +
    page;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// Récupération du détail d'un film
export function getFilmDetailFromApi(id) {
  return fetch(
    'https://api.themoviedb.org/3/movie/' +
      id +
      '?api_key=' +
      API_TOKEN +
      '&language=fr',
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export const getImageFromAPi = (name: string): string => {
  return 'https://image.tmdb.org/t/p/w300' + name;
};
