import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useState } from 'react';

function Movies(props) {
  const [wrongMessage, setWrongMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const savedMovies = false;
  return (
    <>
      <Header />
      <section className="section movies">
        <SearchForm setLoading={setIsLoading} search={props.search} error={setWrongMessage}/>
        <MoviesCardList movies={props.moviesArray} error={wrongMessage} isLoading ={isLoading} savedMovies={savedMovies} />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
