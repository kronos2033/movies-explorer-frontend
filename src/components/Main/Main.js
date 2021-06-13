import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import Navbar from '../Navbar/Navbar';
import AboutProject from '../AboutProject/AboutProject';
import Technologies from '../Technologies/Technologies';
import AboutMe from '../AboutMe/AboutMe';
import './Main.css';

function Main(props) {
  return (
    <div className = 'main'>
      <Header backgroundColor = {'#F3C1F8'}/>
      <Promo />
      <Navbar/>
      <AboutProject/>
      <Technologies/>
      <AboutMe/>
    </div>
  );
}

export default Main;
