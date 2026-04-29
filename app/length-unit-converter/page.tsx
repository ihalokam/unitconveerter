import React from 'react'
import type { Metadata } from 'next'
import LengthService from '../Components/LengthService'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import LengthContent from '../Components/LengthContent'

export const metadata: Metadata = {
    title: 'Length & Distance Unit Converter – mm, cm, m, km, in, ft, mi',
    description: 'Convert length and distance units instantly. Supports mm, cm, m, km, inches, feet, yards, miles, nautical miles, and more. Bulk CSV conversion included.',
    alternates: { canonical: 'https://batchunits.com/length-unit-converter' },
    openGraph: {
        title: 'Length Unit Converter – Batch Units',
        description: 'Free online length and distance converter. Metric and imperial units. Bulk CSV support.',
        url: 'https://batchunits.com/length-unit-converter',
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