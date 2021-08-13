import { useState, useEffect } from 'react';
import * as mainApi from '../../utils/mainApi';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';
function SavedMovies(props) {
  const [searchMoviesArray, setSearchMoviesArray] = useState([]);
  // const savedMovies = true
  return (
    <>
      <Header />
      <section className="saved-movies section">
        <SearchForm
          setLoading={props.setLoading}
          setMovieArray={setSearchMoviesArray}
          errMessage={props.errMessage}
          setErrMessage={props.setErrMessage}
        />
        <MoviesCardList
          movies={props.savedMoviesArray}
          isLoading={props.isLoading}
          handleDelete={props.hendleDelete}
          getSavedMoviesArray={props.getSavedMoviesArray}
          savedMovies
        />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
