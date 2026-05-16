import React from 'react'
import Navbar from '@/app/Components/Navbar'
import Footer from '@/app/Components/Footer'
import PngToPdf from '@/app/Components/PDFtools/PNGtoPDF/PngToPdf'
import PngToPdfContent from '@/app/Components/PDFtools/PNGtoPDF/PngToPdfContent'
import Faq from '@/app/Components/PDFtools/PNGtoPDF/Faq'
import Guide from '@/app/Components/PDFtools/PNGtoPDF/Guide'
import { Metadata } from 'next';
import Algorithm from '@/app/Components/PDFtools/PNGtoPDF/Algorithm'
export const metadata: Metadata = {
    title: 'Secure Image to PDF Converter',
    description: 'Convert PNG, JPG, and WebP to PDF with 100% privacy. No server uploads. Professional layout control (A4, Letter) with bulk drag-and-drop support.',
    alternates: {
        canonical: 'https://standardconvert.com/pdf-tools/image-to-pdf-converter'
    },
    keywords: [
        "Secure image to PDF",
        "Private PNG to PDF converter",
        "Offline JPG to PDF",
        "Bulk image to PDF converter",
        "image to PDF converter",
        "A4 PDF layout image converter"
    ],
}

function page() {
    return (
        <div>
            <Navbar />
            <main>
                <PngToPdf />
                <PngToPdfContent />
                <Guide />
                <Algorithm />
                <Faq />
            </main>
            <Footer />
        </div>
    )
}

export default page