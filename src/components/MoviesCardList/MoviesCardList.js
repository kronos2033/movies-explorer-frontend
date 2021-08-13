import { useCallback, useState } from 'react';
import { MOVIE_URL } from '../../utils/movieApi';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import * as mainApi from '../../utils/mainApi'
import './MoviesCardList.css';

function MoviesCardList(props) {
  let screenWidth = window.screen.width;
  let moviedCardCounter;
  function getScreenWidth() {
    if (screenWidth > 321) {
      return (moviedCardCounter = 3);
    } else {
      return (moviedCardCounter = 5);
    }
  }
  getScreenWidth();
  const [maxRange, setMaxRange] = useState(moviedCardCounter);
  const loadMore = useCallback(() => {
    setMaxRange((prevRange) => prevRange + moviedCardCounter);
  }, []);

  function handleLikeMovie({country ,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    id,
    nameRU,
    nameEN}) {
    mainApi.likeMovies({country,
      director,
      duration,
      year,
      description,
      image:`${mainApi.BASE_URL}image.url`,
      ['trailer']: trailerLink,
      ['thumbnail']:`${mainApi.BASE_URL}image.url`,
      ['movieId']:id,
      nameRU,
      nameEN})
    .then((res) => { 
      console.log(res)
    })
  }

  function handleDeleteMovie (id) {
    mainApi.deleteMovie(id) 
.then((res)=> console.log(res))
  }

  return (
    <>
      {props.isLoading ? (
        <Preloader />
      ) : (
        <>
          {props.movies.length > 0 ? (
            <>
              {props.movies.slice(0, maxRange).map((movie) => {
                console.log(movie)
                return (
                  <MoviesCard
                    key={movie.id}
                    movieName={movie.nameRU}
                    movieDuration={movie.duration}
                    movieImage={`${MOVIE_URL}${movie.image.url}`}
                    savedMovies={props.savedMovies}
                    movie={movie}
                    handleLike={handleLikeMovie}
                    handleDelete={handleDeleteMovie}
                  />
                );
              })}
              {props.movies.length > moviedCardCounter && (
                <button className="movies-list__button" onClick={loadMore}>
                  Ещё
                </button>
              )}
            </>
          ) : (
            <p className="movie-list__notfound">Ничего не найдено</p>
          )}
        </>
      )}
    </>
  );
}

export default MoviesCardList;
