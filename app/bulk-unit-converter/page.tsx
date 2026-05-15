import Navbar from "../Components/Navbar";
import Pressure from "../Components/UnitComponents/Pressure";
import Length from "../Components/UnitComponents/Length";
import Mass from "../Components/UnitComponents/Mass";
import Temperature from "../Components/UnitComponents/Temperature";
import Volume from "../Components/UnitComponents/Volume";
import Energy from "../Components/UnitComponents/Energy";
import Footer from "../Components/Footer";
import Glimpse from "../Components/UnitComponents/Glimpse";
import Trust from "../Components/UnitComponents/Trust";
import Upload from "../Components/UnitComponents/Upload";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bulk Unit Converter | Batch Convert CSV & Excel Files",
    description: "Convert thousands of units at once with our industrial-grade bulk unit converter. Supports CSV and Excel files for mass, length, temperature, and more.",
    alternates: {
        canonical: "https://standardconvert.com/bulk-unit-converter",
    },
};



function page() {
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
    )
}

export default page