import "./App.css";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Route, Switch, useRouteMatch } from "react-router-dom";
function App() {
  const isMain = false;
  const {url, path} = useRouteMatch();
  console.log(url, path)
  return (
    <>
    {}
     <Header backgroundColor={isMain ? "#F3C1F8":"#fff"} isMain={isMain} />
      <Switch>
     
        <Route path='/main'>
          <Main />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies />
        </Route>
        
        <Route path='/sign-in'>
          <Login />
        </Route>
        <Route path='/sign-up'>
          <Register />
        </Route>
        <Route path='/'>
          <NotFoundPage />
        </Route>
      </Switch>
     <Footer />
    </>
  );
}

export default App;
