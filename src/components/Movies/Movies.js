import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';

function Movies(props) {
    const isMain = false
  return (
    <section className='movies section'>
      <Header isMain = {isMain}/>
      <SearchForm/>
    </section>
  );
}

export default Movies;
