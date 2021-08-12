import Header from '../Header/Header';
import './Profile.css';
import { useState } from 'react';
import { validate } from 'react-email-validator';

function Profile(props) {
  const [userData, setUserData] = useState({ name:props.userInfo.name, email: props.userInfo.email});
  const [emailValidateError, setEmailValidateError] = useState(
    '',
  );
  const [nameError, setNameError] = useState(
    '',
  );
  function validateInput(name, value) {
    switch (name) {
      case 'name':
        if (value.length < 3 && name === 'name') {
          setNameError('Имя должно содержать минимум 3 символа');
        } else {
          setNameError('');
        }
        break;
      case 'email':
        if (!validate(value) && name === 'email') {
          setEmailValidateError('Введите верный email');
        } else {
          setEmailValidateError('');
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
    props.onUpdate(userData);
  };
  return (
    <>
      <Header />
      <section className="profile">
        <h2 className="profile__title">Привет, Александр!</h2>
        <form className="profile__form">
          <div className="profile__input-container">
            <span className="profile__text">Имя</span>
            <input
              type="input"
              className="profile__input profile__input_name"
              placeholder="Имя"
              name="name"
              min="3"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <span className=" form__text form__error-text">{nameError}</span>
          <div className="profile__input-container">
            <span className="profile__text">E-mail</span>
            <input
              type="input"
              className="profile__input profile__input_email"
              placeholder="E-mail"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <span className="form__text form__error-text">
            {emailValidateError}
          </span>
          <button
            className={
              emailValidateError || nameError
                ? 'profile__button profile__button_correction profiel__button_disabled'
                : 'profile__button profile__button_correction'
            }
            onClick={handleSubmit}
          >
            Редактировать
          </button>
        </form>
        <button
          className="profile__button profile__button_exit"
          onClick={props.onLogout}
        >
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}

export default Profile;
