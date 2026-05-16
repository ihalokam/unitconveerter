import React from 'react'
import Navbar from '@/app/Components/Navbar'
import Footer from '@/app/Components/Footer'
import MetadataRemove from '@/app/Components/PDFtools/MetaDataRemover/MetadataRemove'
import Guide from '@/app/Components/PDFtools/MetaDataRemover/Guide'
import Faq from '@/app/Components/PDFtools/MetaDataRemover/Faq'
import Features from '@/app/Components/PDFtools/MetaDataRemover/Features'
import Disclaimer from '@/app/Components/PDFtools/MetaDataRemover/Disclaimer'
import { Metadata } from 'next'
import Algorithm from '@/app/Components/PDFtools/MetaDataRemover/Algo'

export const metadata: Metadata = {
    title: 'PDF Metadata Remover',
    description: 'Remove PDF Metadata, securely and locally, not sending any info to any server.',
    alternates: {
        canonical: 'https://standardconvert.com/pdf-tools/pdf-metadata-remover'
    },
    keywords: [
        "Remove PDF metadata",
        "secure PDF Metadata Remover",
        "Strip PDF hidden info",
        "Clean PDF properties",
        "XMP metadata scrubber",
        "PDF sanitization tool",
        "Anonymous PDF sharing"
    ],
    openGraph: {
        title: 'Deep PDF Metadata Remover | StandardConvert.com',
        description: 'Sanitize your PDF documents by removing /Author, /Producer, and location data. Secure, local-first metadata scrubbing.',
        url: 'https://standardconvert.com/pdf-tools/pdf-metadata-remover',
        siteName: 'Standard Convert',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sanitize PDF Metadata Locally',
        description: 'Remove hidden identity markers from your PDF files before sharing. No server uploads.',
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
                <MetadataRemove />
                <Features />
                <Guide />
                <Algorithm />
                <Faq />
                <Disclaimer />
            </main>
            <Footer />
        </div>
    )
}

export default page