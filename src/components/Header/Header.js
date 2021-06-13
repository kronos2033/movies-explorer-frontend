import headerLogo from '../../images/logo.svg';
import { Link, Route } from 'react-router-dom';
import './Header.css';
function Header(props) {
  return (
    <div className='header' style={{backgroundColor:props.backgroundColor}}>
      <img className='header__logo' src={headerLogo} alt='header-logo' />
      <div className='header__link'>
      <Route>
        <Link className='header__register'>Регистрация</Link>
      </Route>
      <Route>
        <Link className='header__login'>Войти</Link>
      </Route>
      </div>
    </div>
  );
}

export default Header;
