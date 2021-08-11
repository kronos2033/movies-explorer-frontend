import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import * as movieApi from '../../utils/movieApi';


function SearchForm(props) {
  const [searchMovieName, setSearchMovieName] = useState('Фонко');
  function handleChange(e) {
    setSearchMovieName(e.target.value);
  }
  function handleSearchMovies(movieName) {
    movieApi
      .getMoviesByName()
      .then((res) => {
        const filteredMovies = res.filter((movie) =>
          movie.nameRU.includes(movieName),
        );
        setSearchMoviesArray(filteredMovies);
      })
      .catch((err) => {
        console.log('Ошибка при попытке получить массив фильмов:', err);
      });
  }
  return (
    <section className="search  section section_type_narrow">
      <form className="search__form">
        <input
          className="search__input"
          type="input"
          placeholder="Фильмы"
          onInput={handleChange}
          required
        ></input>
        <button onClick={handleSearchMovies(searchMovieName)} className="search__button"></button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
