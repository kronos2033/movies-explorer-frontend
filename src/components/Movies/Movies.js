import { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import * as movieApi from '../../utils/movieApi'
import './Movies.css';

function Movies(props) {
  
  return (
    <>
      <Header />
      <section className="section section_type_narrow movies">
        <SearchForm
          // setLoading={props.setLoading}
          // setMovieArray={setSearchMoviesArray}
          errMessage = {props.errMessage}
          handleSearch={props.handleSearch}
          searchParametrs={props.searchParametrs}
          setSearchParametrs={props.setSearchParametrs}
          setErrMessage = {props.setErrMessage}
        />
        <MoviesCardList
          movies={props.moviesArray}
          isLoading={props.isLoading}
          handleLike={props.handleLike}
          savedMovies={false}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
