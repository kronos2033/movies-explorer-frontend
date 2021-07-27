import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import Navbar from '../Navbar/Navbar';
import AboutProject from '../AboutProject/AboutProject';
import Technologies from '../Technologies/Technologies';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/ Portfolio';
import Footer from '../Footer/Footer';
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
