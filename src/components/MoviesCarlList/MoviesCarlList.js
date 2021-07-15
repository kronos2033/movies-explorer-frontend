import MoviesCard from '../MoviesCard/MoviesCard';
function MoviesCardList(props) {
  return (
    <>
      {props.movies.map((movie) => {
        return (
          <MoviesCard
            movieName={movie.name}
            movieDuration={movie.duration}
            movieImage ={movie.image}
          />
        );
      })}
    </>
  );
}

export default MoviesCardList;
