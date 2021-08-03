import "./App.css";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as register from "../../utils/register";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
// c
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ email: "", name: "" });
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/movies");
    }
  }, [loggedIn]);

  useEffect(() => {
    jwtTokenCheck();
  }, []);

  function jwtTokenCheck() {
    if (localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");
      register.getContent(jwt).then((res) => {
        if (res.email) {
          setLoggedIn(true);
        }
      });
    }
  }
  function handleLogin({ email, password }) {
    return register
      .autorize(email, password)
      .then((res) => {
        if (res.token) {
          history.push("/movies");
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          console.log("in then");
        }
      })
      .catch((err) => {
        console.log("что то пошло не так");
      });
  }

  function handleRegister({ name, email, password }) {
    return register
      .register(name, email, password)
      .then((res) => {
        console.log(res);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации: ${err}`);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            path="/saved-movies"
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
