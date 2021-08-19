import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="section section_type_narrow movies">
        <SearchForm
          errMessage={props.errMessage}
          handleSearch={props.handleSearch}
          searchParametrs={props.searchParametrs}
          setSearchParametrs={props.setSearchParametrs}
          setErrMessage={props.setErrMessage}
        />

        <MoviesCardList
          preloader={props.preloader}
          movies={props.moviesArray}
          handleDeleteByLike={props.handleDeleteByLike}
          handleDelete={props.handleDelete}
          handleLike={props.handleLike}
          savedMovies={false}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
