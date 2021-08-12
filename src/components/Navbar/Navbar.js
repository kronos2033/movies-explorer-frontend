import { HashLink as Link } from 'react-router-hash-link';
import './Navbar.css';

function Navbar(props) {
  return (
    <nav className="nav">
      <div className="nav__container">
        <Link className="nav__link" to="#about">
          О проекте
        </Link>
        <Link className="nav__link" to="#technologies">
          Технологии
        </Link>
        <Link className="nav__link" to="#about-me">
          Студент
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
