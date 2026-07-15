import React from 'react'
import type { Metadata } from 'next'
import { LengthServiceDynamic as LengthService } from '../../Components/UnitComponents/ServiceLoaders'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import LengthContent from '../../Components/UnitComponents/LengthContent'

export const metadata: Metadata = {
    title: 'Length & Distance Unit Converter in bulk CSV and Excel files – mm, cm, m, km, in, ft, mi',
    description: 'Convert length and distance units online in bulk CSV and Excel files.',
    alternates: { canonical: 'https://standardconvert.com/bulk-unit-converter/length-unit-converter-in-bulk-csv-excel-files' },
    openGraph: {
        title: 'Length & Distance Unit Converter in bulk CSV and Excel files',
        description: 'Free online length and distance converter. Metric and imperial units. Bulk CSV support.',
        url: 'https://standardconvert.com/bulk-unit-converter/length-unit-converter-in-bulk-csv-excel-files',
    },
}

export default function LengthConverterPage() {
    return (
        <>
            <Navbar />
            <LengthService />
            <LengthContent />
            <Footer />
        </>
    )
}