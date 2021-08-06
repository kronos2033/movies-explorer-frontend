import "./Login.css";
import headerLogo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { validate } from "react-email-validator";


function Login(props) {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [emailValidateError, setEmailValidateError] = useState(
    "Введите валидный email"
  );
  const [passwordError, setPasswordError] = useState(
    "Пароль должен содержать минимум 3 символа"
  );

  function validateInput(name, value) {
    switch (name) {
      case "password":
        if (value.length < 3 && name === "password") {
          setPasswordError("Пароль должен содержать минимум 3 символа");
        } else {
          setPasswordError("");
        }
        break;
      case "email":
        if (!validate(value) && name === "email") {
          setEmailValidateError("Введите верный email");
        } else {
          setEmailValidateError("");
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
    console.log('submit')

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
          <span className=" form__text form__error-text">
            {emailValidateError}
          </span>
          <span className="form__text login__text login__text_password">
            Пароль
          </span>
          <input
            className="form__input login__input login__input_password"
            name="password"
            onChange={handleChange}
            value={userData.password}
            type="text"
            min="3"
            required
          />
          <span className=" form__text form__error-text">{passwordError}</span>
          
          <button className={
              emailValidateError || passwordError
                ? "form__btn form__btn_disabled"
                : "form__btn"
            }>Войти</button>
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
