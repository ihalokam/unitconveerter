import React from 'react'
import type { Metadata } from 'next'
import LengthService from '../../Components/UnitComponents/LengthService'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import LengthContent from '../../Components/UnitComponents/LengthContent'

export const metadata: Metadata = {
    title: 'Length & Distance Unit Converter – mm, cm, m, km, in, ft, mi',
    description: 'Convert length and distance units instantly. Supports mm, cm, m, km, inches, feet, yards, miles, nautical miles, and more. Bulk CSV conversion included.',
    alternates: { canonical: 'https://standardconvert.com/bulk-unit-converter/length-unit-converter-in-bulk-csv-excel-files' },
    openGraph: {
        title: 'Length Unit Converter – Standard Convert',
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