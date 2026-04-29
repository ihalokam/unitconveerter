import React from 'react'
import type { Metadata } from 'next'
import VolumeService from '../Components/VolumeService'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import VolumeContent from '../Components/VolumeContent'

export const metadata: Metadata = {
    title: 'Volume Unit Converter – Liters, Gallons, ml, fl oz, Cups',
    description: 'Convert volume units online. Liters to gallons, ml to fluid ounces, cups to milliliters, and more. Free bulk CSV volume conversion tool.',
    alternates: { canonical: 'https://batchunits.com/volume-unit-converter' },
    openGraph: {
        title: 'Volume Unit Converter – Batch Units',
        description: 'Free liters to gallons, ml to oz, and more. Accurate volume conversion with bulk CSV support.',
        url: 'https://batchunits.com/volume-unit-converter',
    },
}

export default function VolumeConverterPage() {
    return (
        <>
            <Navbar />
            <VolumeService />
            <VolumeContent />
            <Footer />
        </>
    )
}