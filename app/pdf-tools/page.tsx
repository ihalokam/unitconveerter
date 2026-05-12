import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import PdfHome from '../Components/PDFtools/PdfHome';


// SEO Metadata Export
export const metadata = {
    title: 'PDF Tools Suite | Free & Private PDF Utilities | StandardConvert.com',
    description: 'Explore our suite of local-first PDF processing tools. Image to PDF converter, metadata remover, and more — all processed securely in your browser with zero uploads.',
    alternates: { canonical: 'https://standardconvert.com/pdf-tools' },
    robots: { index: true, follow: true },
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