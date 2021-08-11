import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {MOVIE_URL} from '../../utils/movieApi'
function MoviesCardList(props) {
  

  return (
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
        <button className='movies-list__button'>Ещё</button>
      )}
    </>
  );
}

export default MoviesCardList;
