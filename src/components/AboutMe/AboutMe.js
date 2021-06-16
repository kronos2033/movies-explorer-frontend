import './AboutMe.css';
import { Link } from 'react-router-dom';
import myPhoto from '../../images/my-photo.jpeg';

function AboutMe() {
  return (
    <section className='about-me section_type_narrow'>
      <h2 className='about-me__title'>Студент</h2>
      <article className='about-me__info'>
      <div className = 'about-me__container'>
        <h3 className='about-me__name'>Александр</h3>
        <p className='about-me__role'>Фронтенд-разработчик, 24 года</p>
        <p className='about-me__text'>
          Я живу в городе Брянск. Я окончил Брянский государтсвенный
          технический университет по специальности информационная безопасность.
          После окончания учёбы устроился работать и параллельно начал изучать
          фронт-энд разработку. Углубляю свои знания, а так же развиваю другие
          области жизни.
        </p>
        <ul className='about-me__links'>
          <li className='about-me__link'>
            <a className = 'about-me__social' href='https://github.com/kronos2033'>GitHub</a>
          </li>
          <li className='about-me__link'>
            <a className = 'about-me__social' href='https://t.me/randomgodmod'>Telegram</a>
          </li>
        </ul>
        </div>
        <img className = 'about-me__avatar' src={myPhoto} alt='my-portrait'/>
      </article>
    </section>
  );
}

export default AboutMe;
