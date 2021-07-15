import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
function MoviesCardList(props) {
  return (
    <>
      {props.movies.map((movie) => {
        return (
            <>
          <MoviesCard
            movieName={movie.name}
            movieDuration={movie.duration}
            movieImage={movie.image}
            savedMovies={props.savedMovies}
          />
          </>
        );
      })}
      {props.movies.length > 5 && <button className ='movies-list__button'>Ещё</button>}
    </>
  );
}

export default MoviesCardList;
