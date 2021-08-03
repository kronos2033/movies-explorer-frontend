import Header from '../Header/Header';
import './Profile.css';
import { useState } from 'react';
function Profile(props) {
  const [userData, setUserData] = useState({name: '', email: ''})
  function handleChange (e) {
    const {name, value} = e.target;
    setUserData({...userData, [name]:value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdate(userData);
  }
  return (
    <>
    <Header/>
      <section className='profile'>
        <h2 className='profile__title'>Привет, Александр!</h2>
        <form className='profile__form'>
          <div className='profile__input-container'>
            <span className='profile__text'>Имя</span>
            <input
              type='input'
              className='profile__input profile__input_name'
              placeholder='Имя'
              name='name'
              onChange={handleChange}
            />
          </div>
          <div className='profile__input-container'>
            <span className='profile__text'>E-mail</span>
            <input
              type='input'
              className='profile__input profile__input_email'
              placeholder='E-mail'
              name='email'
              onChange={handleChange}
            />
          </div>
          <button className='profile__button profile__button_correction'
          onClick={handleSubmit}>
            Редактировать
          </button>
        </form>
        <button className='profile__button profile__button_exit' onClick={props.onLogout}>
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}

export default Profile;
