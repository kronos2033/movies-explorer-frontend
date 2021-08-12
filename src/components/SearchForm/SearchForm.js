import './SearchForm.css';
import { useState, useEffect } from 'react';
import * as movieApi from '../../utils/movieApi';

function SearchForm(props) {
  const [searchParametrs, setSearchParametrs] = useState({
    name: '',
    checked: false,
  });

  useEffect(() => {
    const initialSearchParams = JSON.parse(
      localStorage.getItem('searchParams'),
    );
    searchMovies(initialSearchParams.name, initialSearchParams.checked);
  }, []);

  function searchMovies(name, checked) {
    props.setLoading(true);
    movieApi
      .getMoviesByName()
      .then((res) => {
        const filteredMoviesByName = res.filter((movie) =>
          movie.nameRU.includes(name),
        );
        let filteredMovies = checked
          ? filteredMoviesByName.filter((movie) => movie.duration < 40)
          : filteredMoviesByName;
        props.search(filteredMovies);
        props.setLoading(false);
      })
      .catch((err) => {
        console.log('Ошибка при попытке получить массив фильмов:', err);
      });
  }

  function handleSearchMovie(name, checked) {
    searchMovies(name, checked);
    localStorage.setItem('searchParams', JSON.stringify(searchParametrs));
  }

  function handleChangeInput(e) {
    setSearchParametrs({
      name: e.target.value,
      checked: searchParametrs.checked,
    });
  }

  function handleChangeCheckbox(e) {
    setSearchParametrs({
      name: searchParametrs.name,
      checked: !searchParametrs.checked,
    });
  }

  return (
    <section className="search  section section_type_narrow">
      <form
        className="search__form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchMovie(searchParametrs.name, searchParametrs.checked);
        }}
      >
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
          checked={searchParametrs.checked}
          onChange={handleChangeCheckbox}
        />
        <div className="checkbox__text">Короткометражки</div>
      </label>
    </section>
  );
}

export default SearchForm;
