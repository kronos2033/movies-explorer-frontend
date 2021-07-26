import './Register.css';
import headerLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
function Register(props) {
  return (
    <section className='section'>
      <div className='register sign'>
        <img src={headerLogo} alt='' className='register__icon sign__icon' />
        <h1 className='register__title sign__title'>Добро пожаловать!</h1>
        <form className='form register__form'>
          <span className='form__text register__text register__text_name'>
            Имя
          </span>
          <input
            type='text'
            className='form__input register__input register__input_name'
          />
          <span className='form__text register__text register__text_email'>
            E-mail
          </span>
          <input
            type='text'
            className='form__input register__input register__input_email'
          />
          <span className='form__text register__text register__text_password'>
            Пароль
          </span>
          <input
            type='text'
            className='form__input register__input register__input_password'
          />
          <button className='form__btn register__btn'>
            Зарегистрироваться
          </button>
        </form>
      </div>
      <div className='register__container sign__container'>
        <span className='register__question sign__question'>
          Уже зарегистрированы?{' '}
        </span>
        <Link to='/sign-up' className='register__login sign__link'>
          &nbsp;Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;
