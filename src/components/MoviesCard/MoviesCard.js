import './MoviesCard.css';

function MoviesCard(props) {
  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    if (minutes === 0) {
      return hours + 'ч';
    } else {
      return hours + 'ч ' + minutes + 'мин';
    }
  }


  function handleLike () {
    props.handleLike(props.movie)
  }

  function handleDelete() {
    props.handleDelete(props.movie.id)
  }
  return (
    <section className="movie section section_type_narrow">
      <div className="movie__info">
        <h2 className="movie__title">{props.movieName}</h2>
        <p className="movie__duration">
          {getTimeFromMins(props.movieDuration)}
        </p>
        {props.savedMovies ? (
          <button className="movie__delete" onClick={handleDelete}/>
        ) : (
          <button className="movie__like" onClick={handleLike}/>
        )}
      </div>
      <img className="movie__image" src={props.movieImage} alt="movie poster" />
    </section>
  );
}

export default MoviesCard;
