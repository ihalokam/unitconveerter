import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Hero from "../../Components/Calculator/Cement/Hero";
import HeroCalc from "../../Components/Calculator/Cement/HeroCalc";
import Formula from "../../Components/Calculator/Cement/Formula";
import Guide from "../../Components/Calculator/Cement/Guide";
import Faq from "../../Components/Calculator/Cement/Faq";

// 1. Define Concrete Calculator SEO Metadata
export const metadata = {
    title: "Concrete Calculator | Estimates, Bags & Mix Logistics",
    description: "Calculate concrete volume in cubic yards or meters. Includes on-site sand moisture adjustments, rebar estimations, and concrete truck delivery schedules.",
    keywords: ["concrete calculator", "cubic yard calculator", "cement mix ratio", "ready mix concrete scheduler", "construction estimators"],
    openGraph: {
        title: "Concrete Calculator | Professional Job-Site Estimator",
        description: "Accurate material breakdown recipes for structural slabs, footings, round piers, and stairs.",
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