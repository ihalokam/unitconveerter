import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import PdfHome from '../Components/PDFtools/PdfHome';


// SEO Metadata Export
export const metadata = {
    title: 'Industrial Conversion Tool Registry | StandardConverter.com',
    description: 'Explore our suite of local-first processing modules. From Image-to-PDF to Metadata removal, process your industrial data securely in your browser.',
    alternates: { canonical: 'https://standardconverter.com/tools' },
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