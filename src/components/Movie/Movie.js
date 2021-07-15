import './Movie.css'

function Movie(props) {
    
  return (
    <section className='movie section section_type_narrow'>
     <div className ='movie__container'>
         <h2 className ='movie__title'>{props.movieName}</h2>
         <p className='movie__length'>1ч 42м</p>
         <button className='movie__delete'/>
         <img className='movie__poster' src={props.movieImage} />
     </div>
    </section>
  );
}

export default Movie;