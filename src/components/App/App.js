import './App.css';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as userApi from '../../utils/userApi';
// import * as movieApi from '../../utils/movieApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [movies, setMovies] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchMoviesArray, setSearchMoviesArray] = useState([]);
  // const [searchMovieName, setSearchMovieName] = useState('Фонко');
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
    userApi
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
    
  function jwtTokenCheck() {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      userApi.getContent(jwt).then((res) => {
        if (res.email) {
          setLoggedIn(true);
        }
      });
    }
  }

  function handleLogin({ email, password }) {
    return userApi
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
    history.push('/signin');
    setLoggedIn(false);
  }
  function handleRegister({ name, email, password }) {
    return userApi
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
    userApi
      .updateUserInfo(name, email)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onUpdate={handleUpdateProfile}
            onLogout={handleLogout}
          />
          <ProtectedRoute
            path="/movies"
            component={Movies}
            // search={setSearchMovieName}
            // handleSearch={handleSearchMovies}
            search = {setSearchMoviesArray}
            moviesArray={searchMoviesArray}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            path="/saved-movies"
            // search={setSearchMovieName}
            // handleSearch={handleSearchMovies}
            component={SavedMovies}
            loggedIn={loggedIn}
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
