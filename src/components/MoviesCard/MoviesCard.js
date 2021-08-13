import './MoviesCard.css';
import { useState } from 'react';
function MoviesCard(props) {
  
  const [isLiked, setIsLiked] = useState(false)
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
    setIsLiked(true)
    props.handleLike(props.movie)
  }
  function handleDelete() {
    setIsLiked(false)
    props.handleDelete(props.movie._id)
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
          <button className={isLiked? "movie__like_active movie__like" : "movie__like"} onClick={!isLiked && handleLike}/>
        )}
      </div>
      <img className="movie__image" src={props.movieImage} alt="movie poster" />
    </section>
  );
}

export default MoviesCard;
