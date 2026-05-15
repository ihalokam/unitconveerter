import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AboutUs from "./Components/HomeComponents/AboutUs";
import UnitConverters from "./Components/HomeComponents/UnitConverters";
import PdfComponent from "./Components/HomeComponents/PdfComponent";
import Calculator from "./Components/Calculator/Calculator";


export default function Home() {
  return (
    <div>
      <Navbar />
      <AboutUs />
      <UnitConverters />
      <PdfComponent />
      <Calculator />
      <Footer />
    </div>


  );
}
