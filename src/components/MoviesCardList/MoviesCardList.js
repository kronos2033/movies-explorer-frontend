import { useCallback, useState } from 'react';
import { MOVIE_URL } from '../../utils/movieApi';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
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

  return (
    <>
      {props.isLoading ? (
        <Preloader />
      ) : (
        <>
          {props.movies.length > 0 ? (
            <>
              {props.movies.slice(0, maxRange).map((movie) => {
                return (
                  <MoviesCard
                    key={movie.id}
                    movieName={movie.nameRU}
                    movieDuration={movie.duration}
                    movieImage={`${MOVIE_URL}${movie.image.url}`}
                    savedMovies={props.savedMovies}
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
