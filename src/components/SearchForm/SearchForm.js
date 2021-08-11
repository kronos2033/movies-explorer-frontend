import './SearchForm.css';
import { useState, useEffect } from 'react';
import * as movieApi from '../../utils/movieApi';

function SearchForm(props) {
  const [searchMovieParametrs, setSearchMovieParametrs] = useState({
    name: '',
    checked: false,
  });
  const searchParams = JSON.parse(localStorage.getItem('searchParams'));

  useEffect(() => {
    movieApi
      .getMoviesByName()
      .then((res) => {
        const filteredMovies = res.filter((movie) =>
          movie.nameRU.includes(searchParams.name),
        );
        props.search(filteredMovies);
      })
      .catch((err) => {
        console.log('Ошибка при попытке получить массив фильмов:', err);
      });
  }, []);

  function handleChangeInput(e) {
    setSearchMovieParametrs({ name: e.target.value });
  }
  function handleChangeCheckbox(e) {
    setSearchMovieParametrs({ checked: !searchMovieParametrs.checked })
  }
  function handleSearchMovies(e) {
    e.preventDefault();
    movieApi
      .getMoviesByName()
      .then((res) => {
        const filteredMovies = res.filter((movie) =>
          movie.nameRU.includes(searchMovieParametrs.name),
        );
        props.search(filteredMovies);
        localStorage.setItem(
          'searchParams',
          JSON.stringify(searchMovieParametrs),
        );
      })
      .catch((err) => {
        console.log('Ошибка при попытке получить массив фильмов:', err);
      });
  }

  return (
    <section className="search  section section_type_narrow">
      <form className="search__form" onSubmit={handleSearchMovies}>
        <input
          className="search__input"
          type="input"
          placeholder="Фильмы"
          onChange={handleChangeInput}
          required
        ></input>
        <button className="search__button"></button>
      </form>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={searchMovieParametrs.checked}
          onChange={handleChangeCheckbox}
        />
        <div className="checkbox__text">Короткометражки</div>
      </label>
    </section>
  );
}

export default SearchForm;
