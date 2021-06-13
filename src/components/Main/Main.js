import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import Navbar from '../Navbar/Navbar';
import AboutProject from '../AboutProject/AboutProject';
import './Main.css';

function Main(props) {
  return (
    <div className = 'main'>
      <Header backgroundColor = {'#F3C1F8'}/>
      <Promo />
      <Navbar/>
      <AboutProject/>
    </div>
  );
}

export default Main;
