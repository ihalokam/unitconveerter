import React from "react";
import type { Metadata } from "next";
import PressureService from "../Components/PressureService";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PressureContent from "../Components/PressureContent";

export const metadata: Metadata = {
    title: "Pressure Unit Converter – PSI, Bar, Pascal, atm, kPa",
    description: "Convert pressure units instantly. PSI to bar, Pascal to atm, kPa to MPa, and more. Free bulk CSV pressure conversion tool for engineering and science.",
    alternates: { canonical: "https://batchunits.com/pressure-unit-converter" },
    openGraph: {
        title: "Pressure Unit Converter – Batch Units",
        description: "Free PSI to bar, Pascal to atm, kPa converter. Bulk CSV pressure unit conversion.",
        url: "https://batchunits.com/pressure-unit-converter",
    },
};

export default function PressureConverterPage() {
    return (
        <>
            <Navbar />
            <PressureService />
            <PressureContent />
            <Footer />
        </>
    )
}