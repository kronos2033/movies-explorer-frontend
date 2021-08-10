import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies(props) {
  const savedMovies = false;
  console.log(props.movies)
  return (
    <>
      <Header />
      <section className="section movies">
        <SearchForm />
        <MoviesCardList movies={props.moviesList} savedMovies={savedMovies} />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
