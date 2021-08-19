import { useState } from 'react';
import { validate } from 'react-email-validator';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import Popup from '../Popup/Popup';
import './Register.css';
function Register(props) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [emailValidateError, setEmailValidateError] = useState(' ');
  const [nameError, setNameError] = useState(' ');
  const [passwordError, setPasswordError] = useState(' ');
  const [valid, setValid] = useState({
    emailValid: false,
    nameValid: false,
    passwordValid: false,
  });



  function validateInput(name, value) {
    switch (name) {
      case 'name':
        if (value.length < 3 && name === 'name') {
          setValid({...valid, nameValid: false})
          setNameError('Имя должно содержать минимум 3 символа');
        } else {
          setValid({...valid, nameValid: true})
          setNameError('');
        }
        break;
      case 'email':
        if (!validate(value) && name === 'email') {
          setValid({...valid, emailValid: false})
          setEmailValidateError('Введите верный email');
        } else {
          setValid({...valid, emailValid: true})
          setEmailValidateError('');
        }
        break;
      case 'password':
        if (value.length < 3 && name === 'password') {
          setValid({...valid, passwordValid: false})
          setPasswordError('Пароль должен содержать минимум 3 символа');
        } else {
          setValid({...valid, passwordValid: true})
          setPasswordError('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(userData);
  };
console.log(valid.emailValid && valid.passwordValid && valid.nameValid)
  return (
    <section className="section section_type_narrow">
      <div className="register sign">
        <img src={headerLogo} alt="" className="register__icon sign__icon" />
        <h1 className="register__title sign__title">Добро пожаловать!</h1>
        <form className="form register__form" onSubmit={handleSubmit}>
          <span className="form__text register__text register__text_name">
            Имя
          </span>
          <input
            type="text"
            className="form__input register__input register__input_name"
            min="2"
            max="20"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <span className="form__text form__error-text">{nameError}</span>
          <span className="form__text register__text register__text_email">
            E-mail
          </span>
          <input
            type="text"
            className="form__input register__input register__input_email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <span className="form__text form__error-text ">
            {emailValidateError}
          </span>
          <span className="form__text register__text register__text_password">
            Пароль
          </span>
          <input
            type="password"
            className="form__input register__input register__input_password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <span className=" form__text form__error-text">{passwordError}</span>
          <button
            className={` form__btn register__btn 
              ${valid.emailValid && valid.passwordValid && valid.nameValid ? '' :'form__btn_disabled' }
            `}
            disabled={!(valid.emailValid && valid.passwordValid && valid.nameValid)}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
      <div className="register__container sign__container">
        <span className="register__question sign__question">
          Уже зарегистрированы?{' '}
        </span>
        <Link to="/sign-in" className="register__login sign__link">
          &nbsp;Войти
        </Link>
      </div>
        <Popup open = {props.open} text ={props.popupText} setOpen={props.setOpen}/>
    </section>
    
  );
}

export default Register;
