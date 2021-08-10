import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {MOVIE_URL} from '../../utils/movieApi'
function MoviesCardList(props) {
  const moviesArray = Array.from(props.movies)
  return (
    <>
      {moviesArray.map((movie) => {
    console.log(movie)
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
