import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Hero from "../../Components/Calculator/Cement/Hero";
import HeroCalc from "../../Components/Calculator/Cement/HeroCalc";
import Formula from "../../Components/Calculator/Cement/Formula";
import Guide from "../../Components/Calculator/Cement/Guide";
import Faq from "../../Components/Calculator/Cement/Faq";

export default function ConcreteCalculatorPage() {
    return (
        <div>
            <Navbar />

            <Hero />
            <HeroCalc />
            <Formula />
            <Guide />
            <Faq />

            <Footer />
        </div>
    );
}