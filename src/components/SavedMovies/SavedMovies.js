import { useState, useEffect } from 'react';
import * as mainApi from '../../utils/mainApi';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';
function SavedMovies(props) {

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
          setLoading={props.setLoading}
          setMovieArray={setSearchMoviesArray}
        />
      <MoviesCardList
          movies={savedMoviesArray}
          isLoading={props.isLoading}
          savedMovies
        />
    </section>
    <Footer/>
    </>
  );
}

export default SavedMovies;
