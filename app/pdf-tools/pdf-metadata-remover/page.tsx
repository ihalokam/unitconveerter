import React from 'react'
import Navbar from '@/app/Components/Navbar'
import Footer from '@/app/Components/Footer'
import MetadataRemove from '@/app/Components/PDFtools/MetaDataRemover/MetadataRemove'
import Guide from '@/app/Components/PDFtools/MetaDataRemover/Guide'
import Faq from '@/app/Components/PDFtools/MetaDataRemover/Faq'
import Features from '@/app/Components/PDFtools/MetaDataRemover/Features'
import Disclaimer from '@/app/Components/PDFtools/MetaDataRemover/Disclaimer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Remove PDF Metadata | Secure & Local PDF Header Scrubber',
    description: 'Remove PDF Metadata. Strip /Author, /Title, /Creator, and hidden XMP metadata packets. 100% local browser-based processing—no files are ever uploaded.',
    alternates: {
        canonical: 'https://standardconverter.com/pdf-metadata-remover'
    },
    keywords: [
        "Remove PDF metadata",
        "PDF author remover",
        "Strip PDF hidden info",
        "Clean PDF properties",
        "XMP metadata scrubber",
        "PDF sanitization tool",
        "Anonymous PDF sharing"
    ],
    openGraph: {
        title: 'Deep PDF Metadata Remover | StandardConverter.com',
        description: 'Sanitize your PDF documents by removing /Author, /Producer, and location data. Secure, local-first metadata scrubbing.',
        url: 'https://standardconverter.com/pdf-metadata-remover',
        siteName: 'Standard Converter',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sanitize PDF Metadata Locally',
        description: 'Remove hidden identity markers from your PDF files before sharing. No server uploads.',
    }
}

function page() {
    return (
        <div>
            <Navbar />
            <MetadataRemove />
            <Features />
            <Guide />
            <Faq />
            <Disclaimer />
            <Footer />
        </div>
    )
}

export default page