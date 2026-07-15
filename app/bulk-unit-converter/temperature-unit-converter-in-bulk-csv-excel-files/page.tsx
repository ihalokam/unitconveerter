import React from 'react'
import type { Metadata } from 'next'
import { TempServiceDynamic as TempService } from '../../Components/UnitComponents/ServiceLoaders'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import TempContent from '../../Components/UnitComponents/TemperatureContent'

export const metadata: Metadata = {
    title: 'Temperature Unit Converter in bulk CSV and excel files – Celsius, Fahrenheit, Kelvin',
    description: 'Convert temperature units online in bulk CSV and Excel files.',
    alternates: { canonical: 'https://standardconvert.com/bulk-unit-converter/temperature-unit-converter-in-bulk-csv-excel-files' },
    openGraph: {
        title: 'Temperature Unit Converter in bulk CSV and excel files',
        description: 'Convert temperature units online in bulk CSV and Excel files.',
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