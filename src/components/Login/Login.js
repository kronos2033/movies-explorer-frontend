import "./Login.css";
import headerLogo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login(props) {
  const [userData, setUserData] = useState({ email: '', password: '' });
  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
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
          <button className="form__btn login__btn">Войти</button>
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
