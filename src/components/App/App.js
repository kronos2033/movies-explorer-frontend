import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/mainApi';
import { MOVIE_URL } from '../../utils/movieApi';
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
  const [savedMoviesArray, setSavedMoviesArray] = useState([]);

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
    getSavedMoviesArray();
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

  function getSavedMoviesArray() {
    mainApi.getSavedMovies().then((res) => setSavedMoviesArray(res));
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
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    id,
    nameRU,
    nameEN,
  }){
    mainApi
      .likeMovies({
        country,
        director,
        duration,
        year,
        description,
        image: `${MOVIE_URL}${image.url}`,
        ['trailer']: trailerLink,
        ['thumbnail']: `${MOVIE_URL}${image.url}`,
        ['movieId']: id,
        nameRU,
        nameEN,
      })
      .then((res) => {
        console.log(res);
      });
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
            setLoading={setIsLoading}
            errMessage={searchValidateError}
            handleLike={handleLikeMovie}
            setErrMessage={setSearchValidateError}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            isLoading={isLoading}
            setLoading={setIsLoading}
            errMessage={searchValidateError}
            hendleDelete={handleDeleteMovie}
            savedMoviesArray={savedMoviesArray}
            setErrMessage={setSearchValidateError}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route>
            {loggedIn ? (
              <Redirect to="/saved-movies" />
            ) : (
              <Redirect to="/main" />
            )}
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
