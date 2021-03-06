import "./NotFoundPage.css";

function NotFoundPage(props) {
  return (
    <>
      <section class='not-found'>
        <h2 className='not-found__title'>404</h2>
        <p className='not-found__text'>Страница не найдена</p>
        <button className='not-found__back' onClick={props.goBack.goBack}>Назад</button>
      </section>
    </>
  );
}

export default NotFoundPage;
