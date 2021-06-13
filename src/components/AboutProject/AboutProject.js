import './AboutProject.css';

function AboutProject() { 
    return (
        <div className='about'>
            <h2 className="about__title">О проекте</h2>
            <div className ='about__diplom-container'>
                <article className = 'about__diplom'>
                    <h3 className = 'about__diplom-title'>Дипломный проект включал 5 этапов</h3>
                    <p className = 'about__diplom-text'>Составление плана, работу над бэкендом,
                    вёрстку, добавление функциональности и финальные доработки.</p>
                </article>
                <article className = 'about__diplom'>
                    <h3 className = 'about__diplom-title'>На выполнение диплома ушло 5 недель</h3>
                    <p className = 'about__diplom-text'>У каждого этапа был мягкий и жёсткий дедлайн,
                    которые нужно было соблюдать, чтобы успешно защититься.</p>
                </article>
            </div>
            <div className = 'about__duration'>
             <p className ='about__first-week'>
            1 неделя
            </p>
            <p className = 'about__second-week'>4 недели</p>
            <span className='about__techno'>Back-end</span>
            <span className='about__techno'>Front-end</span>
            </div>
        </div>
    );
}

export default AboutProject;