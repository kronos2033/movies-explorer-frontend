import './MoviesCard.css';
function MoviesCard(props) {
  return (
    <section className='movie section section_type_narrow'>
      <div className='movie__container'>
        <div className='movie__info'>
          <h2 className='movie__title'>{props.movieName}</h2>
          <p className='movie__duration'>{props.movieDuration}</p>
          <button className={props.savedMovies ? 'movie__delete' : 'movie__like'}/>
        </div>
        <img className='movie__image' src={props.movieImage} alt='movie poster'/>
      </div>
    </section>
  );
}

export default MoviesCard;
