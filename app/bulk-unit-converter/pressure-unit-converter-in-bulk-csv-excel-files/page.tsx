import React from "react";
import type { Metadata } from "next";
import { PressureServiceDynamic as PressureService } from "../../Components/UnitComponents/ServiceLoaders";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import PressureContent from "../../Components/UnitComponents/PressureContent";

export const metadata: Metadata = {
    title: "Pressure Unit Converter in bulk CSV and excel files – PSI, Bar, Pascal, atm, kPa",
    description: "Convert pressure units online in bulk CSV and Excel files.",
    alternates: { canonical: "https://standardconvert.com/bulk-unit-converter/pressure-unit-converter-in-bulk-csv-excel-files" },
    openGraph: {
        title: "Pressure Unit Converter in bulk CSV and excel files",
        description: "Convert pressure units online in bulk CSV and Excel files.",
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