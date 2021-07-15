import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer'
import {allMovies} from '../../utils/constants'
function Movies(props) {
    const savedMovies = false;
  return (
    <>
    <Header/>
    <SearchForm/>
    <MoviesCardList movies={allMovies} savedMovies={savedMovies}/>
    <Footer/>
    </>
  );
}

export default Movies;