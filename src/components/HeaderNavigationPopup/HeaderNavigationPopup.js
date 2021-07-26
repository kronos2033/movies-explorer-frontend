import './HeaderNavigationPopup.css';
import { Link, Route } from 'react-router-dom';

function HeaderNavigationPopup (props) {
  return (
<div className='header__links'>
     {props.isMain ? (
      <>
        <Route>
          <Link className='header__register'>Регистрация</Link>
        </Route>
        <Route>
          <Link className='header__login'>Войти</Link>
        </Route>
      </>
    ) : (
      <>
      <div className='header__account header__account_open'>
      <Route>
          <Link className='header__films'>Фильмы</Link>
        </Route>
        <Route>
          <Link className='header__saved-films'>Сохранённые фильмы</Link>
        </Route>
        <Route>
          <Link className='header__profile'>Аккаунт</Link>
        </Route>
      </div>
       <button className ='header__burger'/>
       </>
    )} 
  </div>
  )
}

export default HeaderNavigationPopup;