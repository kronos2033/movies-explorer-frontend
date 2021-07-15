import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer'
import {likedMovies} from '../../utils/constants'
function SavedMovies(props) {
  const savedMovies = true;
    const isMain = false;
  return (
    <section className='movies section'>
      <Header isMain = {isMain}/>
      <SearchForm/>
      <MoviesCardList movies = {likedMovies} savedMovies={savedMovies}/>
      <Footer/>
    </section>
  );
}

export default SavedMovies;
