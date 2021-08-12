import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { MOVIE_URL } from '../../utils/movieApi';
import { useState,useCallback } from 'react';
function MoviesCardList(props) {
  const [maxRange, setMaxRange] = useState(3)
  let prevRange =0
  const loadMore = useCallback(
    () => {
      setMaxRange(prevRange=> prevRange + 3)
    },
    [],
  )
  return (
    <>
      {props.isLoading ? (
        <Preloader />
      ) : (
        <>
          {props.movies.length > 0 ? (
            <>
              {props.movies.slice(0,maxRange).map((movie) => {
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
              {props.movies.length > 3 && (
                <button className="movies-list__button" onClick={loadMore}>Ещё</button>
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
