import { useState, useEffect } from 'react';
import * as mainApi from '../../utils/mainApi';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';
function SavedMovies(props) {
  const [wrongMessage, setWrongMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchMoviesArray, setSearchMoviesArray] = useState([]);
  const [savedMoviesArray, setSavedMoviesArray] = useState([])
  
  useEffect(() => {
    mainApi.getSavedMovies()
    .then((res)=>setSavedMoviesArray(res))
  }, [])
 console.log(savedMoviesArray)
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
          movies={savedMoviesArray}
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
