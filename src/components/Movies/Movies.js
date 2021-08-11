import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies(props) {
  const savedMovies = false;
  return (
    <>
      <Header />
      <section className="section movies">
        <SearchForm search={props.search}/>
        <MoviesCardList movies={props.moviesArray} savedMovies={savedMovies} />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
