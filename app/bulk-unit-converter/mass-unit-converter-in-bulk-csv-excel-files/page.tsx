import React from 'react'
import type { Metadata } from 'next'
import { MassServiceDynamic as MassService } from '../../Components/UnitComponents/ServiceLoaders'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import MassContent from '../../Components/UnitComponents/MassContent'

export const metadata: Metadata = {
    title: 'Mass & Weight Unit Converter – kg, lbs, g, oz, ton',
    description: 'Convert mass and weight units online. Supports kilograms, pounds, grams, ounces, tonnes, stones, and more. Free bulk CSV mass conversion tool.',
    alternates: { canonical: 'https://standardconvert.com/bulk-unit-converter/mass-unit-converter-in-bulk-csv-excel-files' },
    openGraph: {
        title: 'Mass & Weight Unit Converter – Standard Convert',
        description: 'Free online mass converter. kg to lbs, grams to ounces, and more. Bulk CSV support.',
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