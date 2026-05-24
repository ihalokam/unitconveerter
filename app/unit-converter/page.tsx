import React from 'react'
import type { Metadata } from 'next'
import TotalConv from '../Components/UnitComponents/TotalConv'
import TotalContent from '../Components/UnitComponents/TotalContent'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export const metadata: Metadata = {
    title: 'Unit converter | Convert any unit from one to another',
    description: 'One converter for all units. Convert mass, length, temperature, volume, energy, and pressure in a single tool. Free, fast, and accurate online unit converter.',
    alternates: { canonical: 'https://standardconvert.com/unit-converter' },
    openGraph: {
        title: 'Unit converter | Convert any unit from one to another',
        description: 'Convert any unit in one place. Mass, length, temperature, volume, energy, and pressure. Free and accurate.',
        url: 'https://standardconvert.com/unit-converter',
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