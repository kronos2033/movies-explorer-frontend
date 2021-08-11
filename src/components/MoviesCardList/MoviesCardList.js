import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { MOVIE_URL } from '../../utils/movieApi';
function MoviesCardList(props) {
  return (
    <>
      {props.isLoading ? (
        <Preloader />
      ) : (
        <>
          {props.movies.length > 0 ? (
            <>
              {props.movies.map((movie) => {
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
              {props.movies.length > 5 && (
                <button className="movies-list__button">Ещё</button>
              )}
            </>
          ) : (
            <p className='movie-list__notfound'>Ничего не найдено</p>
          )}
        </>
      )}
    </>
  );
}

export default MoviesCardList;
