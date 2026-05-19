import React from 'react'
import type { Metadata } from 'next'
import { TempServiceDynamic as TempService } from '../../Components/UnitComponents/ServiceLoaders'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import TempContent from '../../Components/UnitComponents/TemperatureContent'

export const metadata: Metadata = {
    title: 'Temperature Unit Converter – Celsius, Fahrenheit, Kelvin',
    description: 'Convert temperature units instantly. Celsius to Fahrenheit, Kelvin to Celsius, and more. Free online temperature converter with bulk CSV support.',
    alternates: { canonical: 'https://standardconvert.com/bulk-unit-converter/temperature-unit-converter-in-bulk-csv-excel-files' },
    openGraph: {
        title: 'Temperature Unit Converter – Standard Convert',
        description: 'Free Celsius to Fahrenheit, Kelvin converter. Accurate and instant temperature conversion.',
        url: 'https://standardconvert.com/bulk-unit-converter/temperature-unit-converter-in-bulk-csv-excel-files',
    },
}

export default function TemperatureConverterPage() {
    return (
        <>
            <Navbar />
            <TempService />
            <TempContent />
            <Footer />
        </>
    )
}