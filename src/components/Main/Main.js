import Promo from "../Promo/Promo";
import Navbar from "../Navbar/Navbar";
import AboutProject from "../AboutProject/AboutProject";
import Technologies from "../Technologies/Technologies";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/ Portfolio";
import "./Main.css";

function Main(props) {
  return (
    <section className='section main'>
      <Promo />
      <Navbar />
      <AboutProject />
      <Technologies />
      <AboutMe/>
      <Portfolio/>
    </section>
  );
}

export default Main;
