import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCarlList/MoviesCarlList';
import Footer from '../Footer/Footer'
import {movies} from '../../utils/constants'
function SavedMovies(props) {
    const isMain = false
  return (
    <section className='movies section'>
      <Header isMain = {isMain}/>
      <SearchForm/>
      <MoviesCardList movies = {movies}/>
      <Footer/>
    </section>
  );
}

export default SavedMovies;
