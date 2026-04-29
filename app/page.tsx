import Navbar from "./Components/Navbar";
import Pressure from "./Components/Pressure";
import Length from "./Components/Length";
import Mass from "./Components/Mass";
import Temperature from "./Components/Temperature";
import Volume from "./Components/Volume";
import Energy from "./Components/Energy";
import Footer from "./Components/Footer";
import Glimpse from "./Components/Glimpse";
import Trust from "./Components/Trust";
import Upload from "./Components/Upload";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Upload />
      <Glimpse />
      <Trust />
      <Pressure />
      <Length />
      <Mass />
      <Temperature />
      <Volume />
      <Energy />
      <Footer />
    </div>


  );
}
