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
    title: 'Secure Image to PDF Converter | PNG & JPG to PDF',
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
        "A4 PDF layout tool"
    ],
    openGraph: {
        title: 'Secure Image to PDF Converter | StandardConvert.com',
        description: 'Convert PNG, JPG, and WebP to PDF locally in your browser. No uploads, no servers — professional PDF layout with drag-and-drop support.',
        url: 'https://standardconvert.com/pdf-tools/image-to-pdf-converter',
        siteName: 'Standard Convert',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Convert Images to PDF Locally — No Uploads',
        description: 'Drag & drop PNG, JPG, WebP files and generate a professional PDF entirely in your browser. 100% private.',
    },
    robots: {
        index: true,
        follow: true,
    },
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