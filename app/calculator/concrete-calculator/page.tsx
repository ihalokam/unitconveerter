import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Hero from "../../Components/Calculator/Cement/Hero";
import HeroCalc from "../../Components/Calculator/Cement/HeroCalc";
import Formula from "../../Components/Calculator/Cement/Formula";
import Guide from "../../Components/Calculator/Cement/Guide";
import Faq from "../../Components/Calculator/Cement/Faq";

// 1. Define Concrete Calculator SEO Metadata
export const metadata = {
    title: "Concrete Calculator | volume, number of cement bags, slab, footing, wall (US/UK/EU)",
    description: "concrete calculator: volume, number of cement bags, slab, footing, wall (US/UK/EU)",
    keywords: ["concrete calculator", "concrete calculator yards", "cement calculator", "concrete calculator bags", "concrete slab calculator"],
    openGraph: {
        title: "Concrete Calculator | volume, number of cement bags, slab, footing, wall (US/UK/EU)",
        description: "concrete calculator: volume, number of cement bags, slab, footing, wall (US/UK/EU)",
        url: "https://standardconvert.com/calculator/concrete-calculator",
        type: "website",
    },
};

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