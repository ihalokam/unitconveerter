import React from 'react'
import type { Metadata } from 'next'
import EnergyService from '../Components/EnergyService'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import EnergyContnet from '../Components/EnergyContnet'

export const metadata: Metadata = {
    title: 'Energy Unit Converter – Joules, kWh, Calories, BTU, eV',
    description: 'Convert energy and power units online. Joules to calories, kWh to joules, BTU to watts, and more. Free bulk CSV energy conversion tool.',
    alternates: { canonical: 'https://standardconvert.com/energy-unit-converter-in-bulk-csv-excel-files' },
    openGraph: {
        title: 'Energy Unit Converter – Standard Convert',
        description: 'Free joules to kWh, calories to BTU converter. Bulk CSV energy unit conversion.',
        url: 'https://standardconvert.com/energy-unit-converter-in-bulk-csv-excel-files',
    },
}

export default function EnergyConverterPage() {
    return (
        <>
            <Navbar />
            <EnergyService />
            <EnergyContnet />
            <Footer />
        </>
    )
}