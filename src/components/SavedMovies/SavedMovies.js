import { useState, useEffect } from 'react';
import * as mainApi from '../../utils/mainApi';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';
function SavedMovies(props) {
  const [searchMoviesArray, setSearchMoviesArray] = useState([]);
  return (
    <>
      <Header />
      <section className="saved-movies section">
        <SearchForm
          errMessage={props.errMessage}
          handleSearch={props.handleSearch}
          searchParametrs={props.searchParametrs}
          setSearchParametrs={props.setSearchParametrs}
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
