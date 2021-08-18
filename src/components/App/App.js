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

function App() {
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValidateError, setSearchValidateError] = useState('');
  const [movieArray, setMovieArray] = useState([]);
  const [savedMovieArray, setSavedMovieArray] = useState([]);
  const [searchParametrs, setSearchParametrs] = useState({
    name: '',
    checked: false,
  });

  const history = useHistory();
  useEffect(() => {
    if (loggedIn) {
      history.push('/movies');
    }
  }, [loggedIn, history]);

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

  useEffect(() => {
    if (localStorage.getItem('searchParams')) {
      const initialSearchParams = JSON.parse(
        localStorage.getItem('searchParams'),
      );
      setSearchParametrs({
        name: initialSearchParams.name,
        checked: initialSearchParams.checked,
      });
      handleSearchMovies(initialSearchParams.name, initialSearchParams.checked);
      handleSearchSavedMovies(
        initialSearchParams.name,
        initialSearchParams.checked,
      );
    }
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
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации: ${err}`);
      });
  }

  function handleSearchMovies(name, checked) {
    setIsLoading(true);
    movieApi
      .getMovies()
      .then((res) => {
        const filteredMoviesByName = res.filter((movie) =>
          movie.nameRU.includes(name),
        );
        const filteredMovies = checked
          ? filteredMoviesByName.filter((movie) => movie.duration < 40)
          : filteredMoviesByName;
        setMovieArray(filteredMovies);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('Ошибка при попытке получить массив фильмов:', err);
      });
  }

  function handleSearchSavedMovies(name, checked) {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('Ошибка при попытке получить массив фильмов:', err);
      });
  }
  function handleUpdateProfile({ name, email }) {
    console.log(name, email);
    mainApi
      .updateUserInfo(name, email)
      .then((newUserInfo) => {
        setCurrentUser({ name: newUserInfo.name, email: newUserInfo.email });
      })
      .catch((err) => console.log(err));
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
      .catch((err)=> console.log(err));
  }

  function handleDeleteMovie(id) {
    mainApi.deleteMovie(id).then((res) => getSavedMoviesArray());
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            path="/profile"
            component={Profile}
            userInfo={currentUser}
            loggedIn={loggedIn}
            onUpdate={handleUpdateProfile}
            onLogout={handleLogout}
          />
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            isLoading={isLoading}
            moviesArray={movieArray}
            errMessage={searchValidateError}
            handleLike={handleLikeMovie}
            handleSearch={handleSearchMovies}
            searchParametrs={searchParametrs}
            setSearchParametrs={setSearchParametrs}
            setErrMessage={setSearchValidateError}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            isLoading={isLoading}
            errMessage={searchValidateError}
            hendleDelete={handleDeleteMovie}
            handleSearch={handleSearchSavedMovies}
            savedMoviesArray={savedMovieArray}
            searchParametrs={searchParametrs}
            setSearchParametrs={setSearchParametrs}
            setErrMessage={setSearchValidateError}
            getSavedMoviesArray = {getSavedMoviesArray}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/main">
            <Main loggedIn={loggedIn} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/main" />}
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
