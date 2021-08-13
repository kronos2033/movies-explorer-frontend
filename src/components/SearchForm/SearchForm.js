import { useEffect, useState } from 'react';
import * as movieApi from '../../utils/movieApi';
import './SearchForm.css';

function SearchForm(props) {
  const [searchParametrs, setSearchParametrs] = useState({
    name: '',
    checked: false,
  });
  // const [searchValidateError, setSearchValidateError] = useState('');

  useEffect(() => {
    const initialSearchParams = JSON.parse(
      localStorage.getItem('searchParams'),
    );
    setSearchParametrs({
      name: initialSearchParams.name,
      checked: initialSearchParams.checked,
    });
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
        const filteredMovies = checked
          ? filteredMoviesByName.filter((movie) => movie.duration < 40)
          : filteredMoviesByName;
        props.setMovieArray(filteredMovies);
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
    validateInput(e.target.value);
  }

  function handleChangeCheckbox(e) {
    setSearchParametrs({
      name: searchParametrs.name,
      checked: !searchParametrs.checked,
    });
  }

  function validateInput(name) {
    if (name.length === 0) {
      props.setErrMessage('Поле не должно быть пустым');
    } else {
      props.setErrMessage('');
    }
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
        <div className="search__container">
          <input
            className="search__input"
            type="input"
            placeholder="Фильмы"
            onChange={handleChangeInput}
            value={searchParametrs.name}
            min="1"
            formNoValidate
            required
          />
          <button
            className={
              props.errMessage
                ? 'search__button_disabled search__button'
                : 'search__button'
            }
            disabled={props.errMessage}
          ></button>
        </div>
        <span className="form__text form__error-text search__error">
          {props.errMessage}
        </span>
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
