import React from 'react'
import type { Metadata } from 'next'
import { EnergyServiceDynamic as EnergyService } from '../../Components/UnitComponents/ServiceLoaders'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import EnergyContent from '../../Components/UnitComponents/EnergyContent'
import HowEnergy from '../../Components/UnitComponents/HowEnergy'

export const metadata: Metadata = {
    title: 'Energy Unit Bulk Converter, CSV and Excel – Joules, kWh, Calories, BTU, eV',
    description: 'Convert energy and power units online in bulk CSV and Excel files.',
    alternates: { canonical: 'https://standardconvert.com/bulk-unit-converter/energy-unit-converter-in-bulk-csv-excel-files' },
    openGraph: {
        title: 'Energy Unit Bulk Converter, CSV and Excel',
        description: 'Free joules to kWh, calories to BTU converter. Bulk CSV energy unit conversion.',
        url: 'https://standardconvert.com/bulk-unit-converter/energy-unit-converter-in-bulk-csv-excel-files',
    },
}

export default function EnergyConverterPage() {
    return (
        <>
            <Navbar />
            <EnergyService />
            <HowEnergy />
            <EnergyContent />
            <Footer />
        </>
    )
}