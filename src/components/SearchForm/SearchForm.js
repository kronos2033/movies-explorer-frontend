import './SearchForm.css';
import { useState, useEffect } from 'react';
import * as movieApi from '../../utils/movieApi';

function SearchForm(props) {
  const [searchParametrs, setSearchParametrs] = useState({
    name: '',
    checked: false,
  });
  const initialSearchParams = JSON.parse(localStorage.getItem('searchParams'));

useEffect((e) => {
  handleSearchMovies(initialSearchParams.name, initialSearchParams.checked)
},[])
  // useEffect((e) => {
  //   props.setLoading(true);
  //   movieApi
  //     .getMoviesByName()
  //     .then((res) => {
  //       const filteredMovies = res.filter((movie) =>
  //         movie.nameRU.includes(initialSearchParams.name),
  //       );
  //       props.search(filteredMovies);
  //       props.setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log('Ошибка при попытке получить массив фильмов:', err);
  //     });
  // }, []);

  function handleSearchMovies(name, checked) {
    props.setLoading(true);

    movieApi
      .getMoviesByName()
      .then((res) => {
        const filteredMoviesByName = res.filter((movie) =>
          movie.nameRU.includes(name),
        );
        let filteredMovies;
        if (checked) {
          filteredMovies = filteredMoviesByName.filter(
            (movie) => movie.duration < 40,
          );
        } else {
          filteredMovies = filteredMoviesByName;
        }
        props.search(filteredMovies);
        localStorage.setItem('searchParams', JSON.stringify(searchParametrs));
        props.setLoading(false);
      })
      .catch((err) => {
        console.log('Ошибка при попытке получить массив фильмов:', err);
      });
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
        onSubmit={(e) =>{
          e.preventDefault();
          handleSearchMovies(searchParametrs.name, searchParametrs.checked)
        }
        }
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
