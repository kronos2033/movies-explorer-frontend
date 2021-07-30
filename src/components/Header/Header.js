import headerLogo from '../../images/logo.svg';
import { Route, Link, NavLink } from 'react-router-dom';

import './Header.css';
function Header(props) {
  return (
    <section
      className='section header'
      style={{ backgroundColor: props.backgroundColor }}
    >
      <Link to='/main'>
        <img className='header__logo' src={headerLogo} alt='header-logo' />
      </Link>
      <div className='header__links'>
        {props.isMain ? (
          <>
            <Route>
              <Link className='header__register' to='/sign-up'>
                Регистрация
              </Link>
            </Route>
            <Route>
              <Link className='header__login' to='/sign-in'>
                Войти
              </Link>
            </Route>
          </>
        ) : (
          <>
            <input id='header__checkbox' type='checkbox' />
            <label
              className='menu-btn header__burger'
              htmlFor='header__checkbox'
            >
              <span></span>
            </label>
            <ul className='header__account'>
              <div className='header__link-container'>
                <Route>
                  <li>
                    <NavLink
                      className='header__link header__link_main'
                      activeClassName='header__link_active'
                      to='/main'
                    >
                      Главная
                    </NavLink>
                  </li>
                </Route>
                <Route>
                  <li>
                    <NavLink
                      className='header__link header__link_films'
                      activeClassName='header__link_active'
                      to='/movies'
                    >
                      Фильмы
                    </NavLink>
                  </li>
                </Route>
                <Route>
                  <li>
                    <NavLink
                      className='header__link header__link_saved-films'
                      activeClassName='header__link_active'
                      to='/saved-movies'
                    >
                      Сохранённые фильмы
                    </NavLink>
                  </li>
                </Route>
              </div>
              <Route>
                <li>
                  <NavLink
                    className='header__link header__link_profile'
                    activeClassName='header__link_active'
                    to='/profile'
                  >
                    Аккаунт
                  </NavLink>
                </li>
              </Route>
            </ul>
            <div className='burger-menu'></div>
          </>
        )}
      </div>
    </section>
  );
}

export default Header;
