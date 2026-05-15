import React from "react";
import type { Metadata } from "next";
import PressureService from "../../Components/UnitComponents/PressureService";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import PressureContent from "../../Components/UnitComponents/PressureContent";

export const metadata: Metadata = {
    title: "Pressure Unit Converter – PSI, Bar, Pascal, atm, kPa",
    description: "Convert pressure units instantly. PSI to bar, Pascal to atm, kPa to MPa, and more. Free bulk CSV pressure conversion tool for engineering and science.",
    alternates: { canonical: "https://standardconvert.com/bulk-unit-converter/pressure-unit-converter-in-bulk-csv-excel-files" },
    openGraph: {
        title: "Pressure Unit Converter – Standard Convert",
        description: "Free PSI to bar, Pascal to atm, kPa converter. Bulk CSV pressure unit conversion.",
        url: "https://standardconvert.com/bulk-unit-converter/pressure-unit-converter-in-bulk-csv-excel-files",
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