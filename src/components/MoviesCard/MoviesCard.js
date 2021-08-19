import { useState } from 'react';
import './MoviesCard.css';
function MoviesCard(props) {
  const [isLiked, setIsLiked] = useState(true);

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    if (minutes === 0) {
      return hours + 'ч';
    } else {
      return hours + 'ч ' + minutes + 'мин';
    }
  }
  function handleLike(e) {
    e.preventDefault();
    props.movie.liked = isLiked;
    props.handleLike(props.movie);
    setIsLiked(!isLiked);
  }

  function handleDeleteByLike (e, id) {
    e.preventDefault();
    props.movie.liked = isLiked;
    setIsLiked(!isLiked);
    props.handleDeleteByLike(id)
  }

  function handleDelete() {
    props.handleDelete(props.movie._id);
  }

  return (
    <a
      className="movie__trailer"
      href={props.movieTrailer}
      target="_blank"
      rel="noreferrer"
    >
      <section className="movie section section_type_narrow">
        <div className="movie__info">
          <h2 className="movie__title">{props.movieName}</h2>
          <p className="movie__duration">
            {getTimeFromMins(props.movieDuration)}
          </p>
          {props.savedMovies ? (
            <button
              className="movie__delete"
              onClick={handleDelete}
            />
          ) : (
            <button
              className={`movie__like 
              ${props.movie.liked ? 'movie__like_active ' : ''}`
              }
              onClick={
                props.movie.liked
                  ? (e) => handleDeleteByLike(e, props.movie.id)
                  : handleLike
              }
            />
          )}
        </div>
        <img
          className="movie__image"
          src={props.movieImage}
          alt="movie poster"
        />
      </section>
    </a>
  );
}

export default MoviesCard;
