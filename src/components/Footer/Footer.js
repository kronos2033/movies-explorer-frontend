import './Footer.css';

function Footer() {
  return (
    <section className="footer section_type_narrow">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer_container">
        <p className="footer__year">&copy; 2021</p>
        <nav className="footer__links">
          <a
            className="footer__link"
            href="https://praktikum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/kronos2033"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="footer__link"
            href="https://t.me/randomgodmod"
            target="_blank"
            rel="noreferrer"
          >
            Telegram
          </a>
        </nav>
      </div>
    </section>
  );
}

export default Footer;
