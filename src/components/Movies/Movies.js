import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Movie from '../Movie/Movie'
import benksy from '../../images/benksy.png'
import oneThousendYear from '../../images/100year.png'
import design from '../../images/design.png'
function Movies(props) {
    const isMain = false
  return (
    <section className='movies section'>
      <Header isMain = {isMain}/>
      <SearchForm/>
      <Movie movieName = '33 слова о дизайне' movieImage={design}/>
      <Movie movieName ='Киноальманах «100 лет дизайна»' movieImage={oneThousendYear}/>
      <Movie movieName ='В погоне за Бенкси' movieImage={benksy}/>
    </section>
  );
}

export default Movies;
