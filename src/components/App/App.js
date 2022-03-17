import { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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
  const [searchValidateError, setSearchValidateError] = useState('');
  const [savedMovieArray, setSavedMovieArray] = useState([]);
  const [filteredMovieArray, setFilteredMovieArray] = useState([]);
  const [searchParametrs, setSearchParametrs] = useState({
    name: '',
    checked: false,
  });
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [preloader, setPreloader] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    jwtTokenCheck();
  }, []);

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
    setPreloader(true);
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
    setPreloader(false);
  }, []);

  function getSavedMoviesArray() {
    mainApi.getSavedMovies().then((res) => setSavedMovieArray(res));
  }

  function jwtTokenCheck() {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      mainApi.getContent(jwt).then((res) => {
        if (res.email) {
          const path = location.pathname;
          setLoggedIn(true);
          history.push(path);
        }
      });
    }
  }

  function handleLogin({ email, password }) {
    return mainApi
      .autorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          history.push('/');
          localStorage.setItem('jwt', res.token);
        }
      })
      .catch((err) => {
        console.log('что то пошло не так');
      });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('searchParams');
    history.push('/sign-in');
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
          <ProtectedRoute
            exact
            path="/"
            component={Movies}
            loggedIn={loggedIn}
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
            tockenCheck={jwtTokenCheck}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            userInfo={currentUser}
            loggedIn={loggedIn}
            popupText={popupText}
            open={isOpenPopup}
            setOpen={setIsOpenPopup}
            onUpdate={handleUpdateProfile}
            onLogout={handleLogout}
          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            errMessage={searchValidateError}
            handleDelete={handleDelete}
            handleSearch={handleSearchSavedMovies}
            savedMoviesArray={savedMovieArray}
            searchParametrs={searchParametrs}
            setSearchParametrs={setSearchParametrs}
            setErrMessage={setSearchValidateError}
            getSavedMoviesArray={getSavedMoviesArray}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register
              onRegister={handleRegister}
              popupText={popupText}
              open={isOpenPopup}
              setOpen={setIsOpenPopup}
            />
          </Route>
          <Route exact path="/main">
            <Main loggedIn={loggedIn} />
          </Route>
          <Route path="*">
            <NotFoundPage goBack={history} />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
