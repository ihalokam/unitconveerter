import React from 'react'
import Navbar from '@/app/Components/Navbar'
import Footer from '@/app/Components/Footer'
import PngToPdf from '@/app/Components/PDFtools/PNGtoPDF/PngToPdf'
import PngToPdfContent from '@/app/Components/PDFtools/PNGtoPDF/PngToPdfContent'
import Faq from '@/app/Components/PDFtools/PNGtoPDF/Faq'
import Guide from '@/app/Components/PDFtools/PNGtoPDF/Guide'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Secure Image to PDF Converter |  PNG & JPG to PDF to PDF',
    description: 'Convert PNG, JPG, and WebP to PDF with 100% privacy. No server uploads. Professional layout control (A4, Letter) with bulk drag-and-drop support.',
    alternates: {
        canonical: 'https://standardconverter.com/pdf-tools/image-to-pdf-converter'
    },
    keywords: [
        "Secure image to PDF",
        "Private PNG to PDF converter",
        "Offline JPG to PDF",
        "Bulk image to PDF converter",
        "image to PDF converter",
        "A4 PDF layout tool"
    ],

}

function page() {
    return (
        <div>
            <Navbar />
            <PngToPdf />
            <PngToPdfContent />
            <Guide />
            <Faq />
            <Footer />
        </div>
    )
}

export default page