import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { likedMovies } from '../../utils/constants';

function SavedMovies(props) {
  const savedMovies = true;
  return (
    <>
    <Header/>
    <section className='saved-movies section'>
      <SearchForm />
      <MoviesCardList movies={likedMovies} savedMovies={savedMovies} />
    </section>
    <Footer/>
    </>
  );
}

export default SavedMovies;
