import './Portfolio.css';

function Portfolio () {
    return ( 
<section className = 'portfolio section_type_narrow'>
    <h2 className = 'portfolio__title'>
        Портфолио
    </h2>
    <ul className = 'portfolio__projects'>
        <li className = 'portfolio__project'><a className = 'portfolio__link' 
        href = 'https://how-to-learn-rust.vercel.app'>Статичный сайт</a></li>
        <li className = 'portfolio__project'><a className = 'portfolio__link' 
        href = 'https://russian-travel-phi.vercel.app'>Адаптивный сайт</a></li>
        <li className = 'portfolio__project'><a className = 'portfolio__link' 
        href = 'https://react-mesto-auth-nine.vercel.app/mesto'>Одностраничное приложение</a></li>
    </ul>
</section>
    )
}

export default Portfolio;