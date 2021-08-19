import { useState } from 'react';
import { validate } from 'react-email-validator';
import { Link } from 'react-router-dom';

import headerLogo from '../../images/logo.svg';
import './Login.css';

function Login(props) {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(' ');
  const [passwordError, setPasswordError] = useState(' ');
  const [valid, setValid] = useState({
    emailValid: false,
    passwordValid: false,
  });

  function validateInput(name, value) {
    switch (name) {
      case 'password':
        if (value.length < 3 && name === 'password') {
          setPasswordError('Пароль должен содержать минимум 3 символа');
          setValid({ ...valid, passwordValid: false });
        } else {
          setPasswordError('');
          setValid({ ...valid, passwordValid: true });
        }
        break;
      case 'email':
        if (!validate(value) && name === 'email') {
          setValid({ ...valid, emailValid: false });
          setEmailError('Введите верный email');
        } else {
          setEmailError('');
          setValid({ ...valid, emailValid: true });
        }
        break;
      default:
        break;
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    validateInput(name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(userData);
  }

  return (
    <section className="section section_type_narrow">
      <div className="login sign">
        <img src={headerLogo} alt="" className="login__icon sign__icon" />
        <h1 className="login__title sign__title">Рады видеть!</h1>
        <form className="form login__form" onSubmit={handleSubmit}>
          <span className="form__text login__text login__text_email">
            E-mail
          </span>
          <input
            className="form__input login__input login__input_email"
            type="text"
            name="email"
            onChange={handleChange}
            value={userData.email}
            required
          />
          <span className=" form__text form__error-text">{emailError}</span>
          <span className="form__text login__text login__text_password">
            Пароль
          </span>
          <input
            className="form__input login__input login__input_password"
            name="password"
            onChange={handleChange}
            value={userData.password}
            type="password"
            min="3"
            required
          />
          <span className=" form__text form__error-text">{passwordError}</span>
          <button
            className={`form__btn login__btn
              ${
                valid.emailValid && valid.passwordValid
                  ? ''
                  : 'form__btn_disabled'
              }
            `}
            disabled={!(valid.emailValid && valid.passwordValid)}
          >
            Войти
          </button>
        </form>
      </div>
      <div className="login__container sign__container">
        <span className="login__question sign__question">
          Ещё не зарегистрированы?
        </span>
        <Link to="/sign-up" className="login__register sign__link">
          &nbsp;Регистрация
        </Link>
      </div>
    </section>
  );
}

export default Login;
