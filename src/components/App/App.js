//TODO preloader like movie
import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/mainApi';
import * as movieApi from '../../utils/movieApi';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';
let movieArray = [];

function App() {
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchValidateError, setSearchValidateError] = useState('');
  const [savedMovieArray, setSavedMovieArray] = useState([]);
  const [filteredMovieArray, setFilteredMovieArray] = useState([]);
  const [searchParametrs, setSearchParametrs] = useState({
    name: '',
    checked: false,
  });
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [preloader, setPreloader] = useState(false)
  const history = useHistory();

  useEffect(() => {
    jwtTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/movies');
    }
  }, [loggedIn, history]);

  useEffect(() => {
    mainApi
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(async () => {
    setPreloader(true)
    movieArray = await movieApi.getMovies().catch((err) => console.log(err));
    if (localStorage.getItem('searchParams')) {
      const initialSearchParams = JSON.parse(
        localStorage.getItem('searchParams'),
      );
      setSearchParametrs({
        name: initialSearchParams.name,
        checked: initialSearchParams.checked,
      });
      handleSearchMovies(initialSearchParams.name, initialSearchParams.checked);
    }
    setPreloader(false)
  }, []);

  function getSavedMoviesArray() {
    mainApi.getSavedMovies().then((res) => setSavedMovieArray(res));
  }

  function jwtTokenCheck() {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      mainApi.getContent(jwt).then((res) => {
        if (res.email) {
          setLoggedIn(true);
        }
      });
    }
  }

  function handleLogin({ email, password }) {
    return mainApi
      .autorize(email, password)
      .then((res) => {
        if (res.token) {
          history.push('/movies');
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log('что то пошло не так');
      });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('searchParams');
    history.push('/signin');
    setLoggedIn(false);
  }

  function handleRegister({ name, email, password }) {
    return mainApi
      .register(name, email, password)
      .then((res) => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации: ${err}`);
        setIsOpenPopup(true);
        setPopupText('Во время регистрации произошла ошибка, попробуйте снова');
      });
  }

  function handleSearchMovies(name, checked) {
    const filteredMoviesByName = movieArray.filter((movie) =>
      movie.nameRU.includes(name),
    );
    const filteredMovies = checked
      ? filteredMoviesByName.filter((movie) => movie.duration < 40)
      : filteredMoviesByName;
    setFilteredMovieArray(filteredMovies);
  }

  function handleSearchSavedMovies(name, checked) {
    mainApi
      .getSavedMovies()
      .then((res) => {
        const filteredMoviesByName = res.filter((movie) =>
          movie.nameRU.includes(name),
        );
        const filteredMovies = checked
          ? filteredMoviesByName.filter((movie) => movie.duration < 40)
          : filteredMoviesByName;
        setSavedMovieArray(filteredMovies);
      })
      .catch((err) => {
        console.log('Ошибка при попытке получить массив фильмов:', err);
      });
  }
  function handleUpdateProfile({ name, email }) {
    mainApi
      .updateUserInfo(name, email)
      .then((newUserInfo) => {
        setCurrentUser({ name: newUserInfo.name, email: newUserInfo.email });
        setIsOpenPopup(true);
        setPopupText('Данные учетной записи обновлены');
      })
      .catch((err) => {
        console.log(err);
        setIsOpenPopup(true);
        setPopupText(
          'Данные не обновлены, проверьте корректность введенных данных',
        );
      });
  }

  function handleLikeMovie({
    country = 'no country',
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    id,
    nameRU,
    nameEN,
  }) {
    mainApi
      .likeMovies({
        ['country']: country || 'не определена',
        director,
        duration,
        year,
        description,
        image: `${movieApi.MOVIE_URL}${image.url}`,
        ['trailer']: trailerLink,
        ['thumbnail']: `${movieApi.MOVIE_URL}${image.url}`,
        ['movieId']: id,
        nameRU,
        nameEN,
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  }

  async function handleDeleteByLike(id) {
    const savedMovie = await mainApi.getSavedMovies();
    const deletedMovie = savedMovie.filter((movie) => movie.movieId === id);
    mainApi
      .deleteMovie(deletedMovie[0]._id)
      .then((res) => getSavedMoviesArray());
  }

  function handleDelete(id) {
    mainApi.deleteMovie(id).then((res) => getSavedMoviesArray());
  }
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/profile">
            <Profile
              userInfo={currentUser}
              loggedIn={loggedIn}
              popupText={popupText}
              open={isOpenPopup}
              setOpen={setIsOpenPopup}
              onUpdate={handleUpdateProfile}
              onLogout={handleLogout}
            />
          </Route>
          <Route path="/movies">
            <Movies
              loggedIn={loggedIn}
              component={Movies}
              moviesArray={filteredMovieArray}
              errMessage={searchValidateError}
              handleDelete={handleDelete}
              handleLike={handleLikeMovie}
              handleSearch={handleSearchMovies}
              searchParametrs={searchParametrs}
              setSearchParametrs={setSearchParametrs}
              setErrMessage={setSearchValidateError}
              handleDeleteByLike={handleDeleteByLike}
              preloader={preloader}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies
              loggedIn={loggedIn}
              component={SavedMovies}
              errMessage={searchValidateError}
              handleDelete={handleDelete}
              handleSearch={handleSearchSavedMovies}
              savedMoviesArray={savedMovieArray}
              searchParametrs={searchParametrs}
              setSearchParametrs={setSearchParametrs}
              setErrMessage={setSearchValidateError}
              getSavedMoviesArray={getSavedMoviesArray}
            />
          </Route>
          <ProtectedRoute
            path="/sign -in"
            onLogin={handleLogin}
            omponent={Login}
          />
          <ProtectedRoute
            path="/sign-up"
            component={Register}
            onRegister={handleRegister}
            popupText={popupText}
            open={isOpenPopup}
            setOpen={setIsOpenPopup}
          />

          <Route path="/main">
            <Main loggedIn={loggedIn} />
          </Route>
        </Switch>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
