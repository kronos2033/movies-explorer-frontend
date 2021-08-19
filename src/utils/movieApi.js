export const MOVIE_URL = 'https://api.nomoreparties.co';
const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);
export const getMovies = () => {
 return fetch(`${MOVIE_URL}/beatfilm-movies`, {
    headers: {
      Accept: 'application/json',
    },
  }).then(checkResponse)
};



