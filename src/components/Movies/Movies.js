import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useState } from 'react';

function Movies(props) {
  const [wrongMessage, setWrongMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchMoviesArray, setSearchMoviesArray] = useState([]);
  const savedMovies = false;


  return (
    <>
      <Header />
      <section className="section section_type_narrow movies">
        <SearchForm
          setLoading={setIsLoading}
          setMovieArray={setSearchMoviesArray}
          error={setWrongMessage}
        />
        <MoviesCardList
          movies={searchMoviesArray}
          error={wrongMessage}
          isLoading={isLoading}
          savedMovies={savedMovies}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
