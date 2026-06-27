import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import PdfHome from '../Components/PDFtools/PdfHome';


// SEO Metadata Export
export const metadata = {
    title: 'PDF all in one converter tools',
    description: 'pdf conversion tools',
    alternates: { canonical: 'https://standardconvert.com/pdf-tools' },
    robots: { index: true, follow: true },
    keywords: [
        "PDF tools",
        "image to PDF converter",
        "PDF metadata remover",
        "private PDF converter",
        "local PDF processing",
        "browser-based PDF tools",
        "no upload PDF converter",
    ],
    openGraph: {
        title: 'Free PDF Tools for conversions',
        description: 'Image to PDF converter, metadata remover, and more. All processed securely in your browser with zero server uploads.',
        url: 'https://standardconvert.com/pdf-tools',
        siteName: 'Standard Convert',
        type: 'website',
        images: [{ url: 'https://standardconvert.com/og.webp', width: 1200, height: 630, alt: 'Standard Convert PDF Tools' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free PDF Tools – Standard Convert',
        description: 'Image to PDF converter & PDF metadata remover. 100% local browser processing, no uploads.',
        images: ['https://standardconvert.com/og.webp'],
    },
};

function page() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <PdfHome />
            <Footer />
        </div>
    )
}

export default page