import { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies(props) {
  
  const [searchMoviesArray, setSearchMoviesArray] = useState([]);
  return (
    <>
      <Header />
      <section className="section section_type_narrow movies">
        <SearchForm
          setLoading={props.setLoading}
          setMovieArray={setSearchMoviesArray}
          errMessage = {props.errMessage}
            setErrMessage = {props.setErrMessage}
        />
        <MoviesCardList
          movies={searchMoviesArray}
          
          isLoading={props.isLoading}
          savedMovies={false}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
