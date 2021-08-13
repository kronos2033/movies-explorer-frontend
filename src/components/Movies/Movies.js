import { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies(props) {
  const [wrongMessage, setWrongMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchMoviesArray, setSearchMoviesArray] = useState([]);
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
          savedMovies={false}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
