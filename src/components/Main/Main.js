import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Portfolio from '../Portfolio/ Portfolio';
import Promo from '../Promo/Promo';
import Technologies from '../Technologies/Technologies';
import './Main.css';

function Main() {
  const isMain = true;
  return (
    <section className='section main'>
      <Header backgroundColor={isMain ? '#F3C1F8' : '#fff'} isMain={isMain} />
      <Promo />
      <Navbar />
      <AboutProject />
      <Technologies />
      <AboutMe />
      <Portfolio />
      <Footer />
    </section>
  );
}

export default Main;
