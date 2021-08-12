import { useState } from 'react';
import * as movieApi from '../../utils/mainApi';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
movieApi.getSavedMovies()
.then((res)=> console.log(res))
function SavedMovies(props) {
  const [wrongMessage, setWrongMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchMoviesArray, setSearchMoviesArray] = useState([]);
  return (
    <>
    <Header/>
    <section className='saved-movies section'>
    <SearchForm
          setLoading={setIsLoading}
          setMovieArray={setSearchMoviesArray}
          error={setWrongMessage}
        />
      <MoviesCardList
          movies={searchMoviesArray}
          error={wrongMessage}
          isLoading={isLoading}
          savedMovies
        />
    </section>
    <Footer/>
    </>
  );
}

export default SavedMovies;
