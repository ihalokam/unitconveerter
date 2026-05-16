import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AboutUs from "./Components/HomeComponents/AboutUs";
import UnitConverters from "./Components/HomeComponents/UnitConverters";
import PdfComponent from "./Components/HomeComponents/PdfComponent";
import Calculator from "./Components/Calculator/Calculator";


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools to make your work easier",
  description: "SaaS solutions for everyday tasks, making jobs easier. Tools with local processing and privacy first design",
  keywords: [
    "unit converters",
    "online calculator",
    "mass converter",
    "length converter",
    "PDF tools",
    "merge PDF",
    "JPG to PDF",
    "free online tools"
  ],
  alternates: {
    canonical: "https://standardconvert.com",
  },
};

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
