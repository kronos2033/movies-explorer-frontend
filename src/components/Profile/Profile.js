import { useState, useEffect } from 'react';
import { validate } from 'react-email-validator';
import Header from '../Header/Header';
import Popup from '../Popup/Popup';
import './Profile.css';

function Profile(props) {
  const [userData, setUserData] = useState({
    name: props.userInfo.name,
    email: props.userInfo.email,
  });
  const [emailValidateError, setEmailValidateError] = useState('');
  const [nameError, setNameError] = useState('');
  const [valid, setValid] = useState({
    emailValid: false,
    nameValid: false,
  });

  useEffect(() => {
    setValid(!!emailValidateError && !!nameError);
  }, [emailValidateError, nameError]);

  function validateInput(name, value) {
    switch (name) {
      case 'name':
        if (value.length < 3 && name === 'name') {
          setValid({ ...valid, nameValid: false });
          setNameError('Имя должно содержать минимум 3 символа');
        } else {
          setValid({ ...valid, nameValid: true });
          setNameError('');
        }
        break;
      case 'email':
        if (!validate(value) && name === 'email') {
          setValid({ ...valid, emailValid: false });
          setEmailValidateError('Введите верный email');
        } else {
          setValid({ ...valid, emailValid: true });
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
      <Header loggedIn={props.loggedIn} />
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
            className={`profile__button profile__button_correction
              ${
                valid.emailValid && valid.nameValid
                  ? ''
                  : 'profiel__button_disabled'
              }
            `}
            disabled={!(valid.emailValid && valid.nameValid)}
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
        <Popup
          open={props.open}
          text={props.popupText}
          setOpen={props.setOpen}
        />
      </section>
    </>
  );
}

export default Profile;
