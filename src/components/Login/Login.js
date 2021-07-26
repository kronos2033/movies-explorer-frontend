import './Login.css';
import headerLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login(props) {
  return (
    <section className='section'>
      <div className='login sign'>
        <img src={headerLogo} alt='' className='login__icon sign__icon' />
        <h1 className='login__title sign__title'>Рады видеть!</h1>
        <form className='form login__form'>
          <span className='form__text login__text login__text_email'>
            E-mail
          </span>
          <input
            type='text'
            className='form__input login__input login__input_email'
          />
          <span className='form__text login__text login__text_password'>
            Пароль
          </span>
          <input
            type='text'
            className='form__input login__input login__input_password'
          />
          <button className='form__btn login__btn'>Войти</button>
        </form>
      </div>
      <div className='login__container sign__container'>
        <span className='login__question sign__question'>
          Ещё не зарегистрированы?
        </span>
        <Link to='/sign-up' className='login__register sign__link'>
          &nbsp;Регистрация
        </Link>
      </div>
    </section>
  );
}

export default Login;
