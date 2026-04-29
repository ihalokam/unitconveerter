import React from 'react'
import type { Metadata } from 'next'
import MassService from '../Components/MassService'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import MassContent from '../Components/MassContent'

export const metadata: Metadata = {
    title: 'Mass & Weight Unit Converter – kg, lbs, g, oz, ton',
    description: 'Convert mass and weight units online. Supports kilograms, pounds, grams, ounces, tonnes, stones, and more. Free bulk CSV mass conversion tool.',
    alternates: { canonical: 'https://batchunits.com/mass-unit-converter' },
    openGraph: {
        title: 'Mass & Weight Unit Converter – Batch Units',
        description: 'Free online mass converter. kg to lbs, grams to ounces, and more. Bulk CSV support.',
        url: 'https://batchunits.com/mass-unit-converter',
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