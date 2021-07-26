import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {likedMovies} from '../../utils/constants'
function SavedMovies(props) {
  const savedMovies = true;
  return (
    <section className='saved-movies section'>
      <SearchForm/>
      <MoviesCardList movies = {likedMovies} savedMovies={savedMovies}/>
    </section>
  );
}

export default SavedMovies;
