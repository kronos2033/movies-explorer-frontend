import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { allMovies } from "../../utils/constants";
function Movies(props) {
  const savedMovies = false;
  return (
    <>
      <section className='section movies'>
        <SearchForm />
        <MoviesCardList movies={allMovies} savedMovies={savedMovies} />
      </section>
    </>
  );
}

export default Movies;
