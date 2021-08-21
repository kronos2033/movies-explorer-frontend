import { useCallback, useEffect, useState } from 'react';
import { MOVIE_URL } from '../../utils/movieApi';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import './MoviesCardList.css';
function MoviesCardList(props) {
  let screenWidth = window.screen.width;
  let moviedCardCounter;
  useEffect(() => {
    getScreenWidth();
  }, []);
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
      {props.preloader ? 
        <Preloader />
       : (
        <>
          {props.movies.length > 0 ? (
            <>
              {props.movies.slice(0, maxRange).map((movie) => {
                { movie.isliked = false }
                return (
                  <MoviesCard
                    key={movie.id || movie._id}
                    movieName={movie.nameRU}
                    movieDuration={movie.duration}
                    movieTrailer={movie.trailerLink}
                    movieImage={
                      props.savedMovies
                        ? movie.image
                        : `${MOVIE_URL}${movie.image.url}`
                    }
                    handleDeleteByLike={props.handleDeleteByLike}
                    savedMovies={props.savedMovies}
                    movie={movie}
                    handleLike={props.handleLike}
                    handleDelete={props.handleDelete}
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
