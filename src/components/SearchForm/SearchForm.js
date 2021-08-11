import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';
import * as movieApi from '../../utils/movieApi';


function SearchForm(props) {
  const [searchMovieName, setSearchMovieName] = useState('');
  function test() {
    console.log('click')
  }
  function handleChange(e) {
    setSearchMovieName(e.target.value);
  }
  function handleSearchMovies(e) {
e.preventDefault();
    console.log('work')
    movieApi
      .getMoviesByName()
      .then((res) => {
        const filteredMovies = res.filter((movie) =>
          movie.nameRU.includes(searchMovieName),
        );
        props.search(filteredMovies);
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
          onChange={handleChange}
          required
        ></input>
        <button onClick={handleSearchMovies} className="search__button"></button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
