import React from 'react'
import type { Metadata } from 'next'
import TotalConv from '../Components/TotalConv'
import TotalContent from '../Components/TotalContent'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export const metadata: Metadata = {
    title: 'All-in-One Unit Converter – Mass, Length, Temp, Volume, Energy & Pressure',
    description: 'One converter for all units. Convert mass, length, temperature, volume, energy, and pressure in a single tool. Free, fast, and accurate online unit converter.',
    alternates: { canonical: 'https://batchunits.com/unit-converter' },
    openGraph: {
        title: 'All-in-One Unit Converter – Batch Units',
        description: 'Convert any unit in one place. Mass, length, temperature, volume, energy, and pressure. Free and accurate.',
        url: 'https://batchunits.com/unit-converter',
    },
}

export default function AllInOneConverterPage() {
    return (
        <>
            <Navbar />
            <TotalConv />
            <TotalContent />
            <Footer />
        </>
    )
}