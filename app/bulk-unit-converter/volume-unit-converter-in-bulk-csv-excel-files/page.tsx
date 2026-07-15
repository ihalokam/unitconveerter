import React from 'react'
import type { Metadata } from 'next'
import { VolumeServiceDynamic as VolumeService } from '../../Components/UnitComponents/ServiceLoaders'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import VolumeContent from '../../Components/UnitComponents/VolumeContent'

export const metadata: Metadata = {
    title: 'Volume Unit Converter in bulk CSV and excel files – Liters, Gallons, ml, fl oz, Cups',
    description: 'Convert volume units online in bulk CSV and Excel files.',
    alternates: { canonical: 'https://standardconvert.com/bulk-unit-converter/volume-unit-converter-in-bulk-csv-excel-files' },
    openGraph: {
        title: 'Volume Unit Converter in bulk CSV and excel files',
        description: 'Convert volume units online in bulk CSV and Excel files.',
        url: 'https://standardconvert.com/bulk-unit-converter/volume-unit-converter-in-bulk-csv-excel-files',
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