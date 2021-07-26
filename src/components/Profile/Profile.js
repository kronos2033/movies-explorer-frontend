import './Profile.css';
   function Profile () { 
  return (
<>
    <section className="profile">
            <h2 className="profile__title">Привет, Александр!</h2>
            <form className="profile__form">
              <div className='profile__input-container'>
              <span className='profile__text'>Имя</span>
                <input type="input" className="profile__input profile__input_name" placeholder="Имя"/>
                </div>
                <div className='profile__input-container'>
                <span className='profile__text'>E-mail</span>
                <input type="input" className="profile__input profile__input_email" placeholder="E-mail"/>
                </div>
<button className="profile__button profile__button_correction">Редактировать</button>
            </form>
            <button className='profile__button profile__button_exit'>Выйти из аккаунта</button>
        </section>
        </>
  );
}

export default Profile;