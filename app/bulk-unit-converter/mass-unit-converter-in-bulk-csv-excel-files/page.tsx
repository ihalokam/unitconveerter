import React from 'react'
import type { Metadata } from 'next'
import { MassServiceDynamic as MassService } from '../../Components/UnitComponents/ServiceLoaders'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import MassContent from '../../Components/UnitComponents/MassContent'

export const metadata: Metadata = {
    title: 'Mass & Weight Unit Converter in bulk CSV and Excel files – kg, lbs, g, oz, ton',
    description: 'Convert mass and weight units online in bulk CSV and Excel files.',
    alternates: { canonical: 'https://standardconvert.com/bulk-unit-converter/mass-unit-converter-in-bulk-csv-excel-files' },
    openGraph: {
        title: 'Mass & Weight Unit Converter in bulk CSV and Excel files',
        description: 'Convert mass and weight units online in bulk CSV and Excel files.',
        url: 'https://standardconvert.com/bulk-unit-converter/mass-unit-converter-in-bulk-csv-excel-files',
    },
}

export default function MassConverterPage() {
    return (
        <>
            <Navbar />
            <MassService />
            <MassContent />
            <Footer />
        </>
    )
}