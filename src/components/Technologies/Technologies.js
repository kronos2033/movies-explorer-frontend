import './Technologies.css';

function Technologies() {
  return (
    <section className='technologies section'>
      <div className='technologies_narrow'>
        <h2 className='technplogies__title'>Технологии</h2>
        <article className='technplogies__article'>
          <h3 className='technologies__about'>7 технологий</h3>
          <p className='technonolies__text'>
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </article>
        <ul className='technologies__list'>
          <li className='technologies__technologie'>HTML</li>
          <li className='technologies__technologie'>CSS</li>
          <li className='technologies__technologie'>JS</li>
          <li className='technologies__technologie'>React</li>
          <li className='technologies__technologie'>Git</li>
          <li className='technologies__technologie'>Express.js</li>
          <li className='technologies__technologie'>mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Technologies;
