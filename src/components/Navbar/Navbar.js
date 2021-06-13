import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar (props) { 
    return (
<nav className = 'nav'>
<div className = 'nav__container'>
    <Link className = 'nav__link' to=''>О проекте</Link>
    <Link className = 'nav__link' to=''>Технологии</Link>
    <Link className = 'nav__link' to=''>Студент</Link>
    </div>
</nav>
    )
}

export default Navbar