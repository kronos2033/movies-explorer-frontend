import { useEffect, useState } from 'react';
import * as movieApi from '../../utils/movieApi';
import './SearchForm.css';

function SearchForm(props) {
 

  function handleSearchMovie(name, checked) {
    props.handleSearch(name, checked);
    localStorage.setItem('searchParams', JSON.stringify(props.searchParametrs));
  }

  function handleChangeInput(e) {
    props.setSearchParametrs({
      name: e.target.value,
      checked: props.searchParametrs.checked,
    });
    validateInput(e.target.value);
  }

  function handleChangeCheckbox(e) {
    props.setSearchParametrs({
      name: props.searchParametrs.name,
      checked: !props.searchParametrs.checked,
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
          handleSearchMovie(props.searchParametrs.name, props.searchParametrs.checked);
        }}
      >
        <div className="search__container">
          <input
            className="search__input"
            type="input"
            placeholder="Фильмы"
            onChange={handleChangeInput}
            value={props.searchParametrs.name}
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
          checked={props.searchParametrs.checked}
          onChange={handleChangeCheckbox}
        />
        <div className="checkbox__text">Короткометражки</div>
      </label>
    </section>
  );
}

export default SearchForm;
