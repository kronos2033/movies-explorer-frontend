import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { allMovies } from '../../utils/constants';
function Movies(props) {
  const savedMovies = false;
  return (
    <>
      <Header />
      <section className='section movies'>
        <SearchForm />
        <MoviesCardList movies={allMovies} savedMovies={savedMovies} />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
