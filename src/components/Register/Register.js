import './Register.css';
import headerLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
function Register(props) {
const [userData, setUserData] = useState ({name: '', email: '', password: ''})
function handleChange (e) {
  const {name, value} = e.target;
  setUserData({...userData, [name]:value})
}

const handleSubmit = (e) => {
  e.preventDefault();
  props.onRegister(userData);
}

return (
    <section className='section section_type_narrow'>
      <div className='register sign'>
        <img src={headerLogo} alt='' className='register__icon sign__icon' />
        <h1 className='register__title sign__title'>Добро пожаловать!</h1>
        <form className='form register__form' onSubmit={handleSubmit}>
          <span className='form__text register__text register__text_name'>
            Имя
          </span>
          <input
            type='text'
            className='form__input register__input register__input_name'
            min='2'
            max='20'
            name='name'
            value={userData.name}
            onChange={handleChange}
            required
          />
          <span className='form__text register__text register__text_email'>
            E-mail
          </span>
          <input
            type='text'
            className='form__input register__input register__input_email'
            name='email'
            value={userData.email}
            onChange={handleChange}
            required
          />
          <span className='form__text register__text register__text_password'>
            Пароль
          </span>
          <input
            type='text'
            className='form__input register__input register__input_password'
            name='password'
            value={userData.password}
            onChange={handleChange}
            required
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
        <Link to='/sign-in' className='register__login sign__link'>
          &nbsp;Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;
