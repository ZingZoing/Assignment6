import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Feature from "../../components/Feature";
import Menu from "../../components/Menu";


function HomeView() {
  return (
    <div>
      <Feature />
      <Header />
      <Hero />
      <Footer />
      <Menu />
    </div>
  );
}

export default HomeView;
