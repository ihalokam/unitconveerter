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
    description: 'Remove hidden PDF metadata including author, creation date, GPS, XMP packets and producer info — 100% locally in your browser. No uploads, no tracking.',
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
        title: 'PDF Metadata Remover – Strip Hidden Info Locally | Standard Convert',
        description: 'Remove hidden PDF metadata including author, creation date, GPS, XMP packets and producer info — 100% locally in your browser. No uploads, no tracking.',
        url: 'https://standardconvert.com/pdf-tools/pdf-metadata-remover',
        siteName: 'Standard Convert',
        type: 'website',
        images: [{ url: 'https://standardconvert.com/og.webp', width: 1200, height: 630, alt: 'PDF Metadata Remover – Standard Convert' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PDF Metadata Remover – Strip Hidden Info Locally',
        description: 'Remove hidden PDF metadata including author, creation date, GPS, XMP packets and producer info. 100% locally, no uploads.',
        images: ['https://standardconvert.com/og.webp'],
    },
    robots: {
        index: true,
        follow: true,
    },
}

const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF Metadata Remover",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "url": "https://standardconvert.com/pdf-tools/pdf-metadata-remover",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Strip hidden PDF metadata including /Author, /Creator, /Producer, creation dates, XMP metadata packets, and GPS data — 100% locally in your browser. No uploads required.",
    "featureList": [
        "Remove /Author, /Creator, /Producer metadata",
        "Strip XMP metadata packets",
        "Remove creation and modification dates",
        "Zero server uploads",
        "Works offline after first load",
        "Supports password-unlocked PDFs"
    ]
}

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What metadata is removed from my PDF?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Standard Convert strips all key /Info entries including /Title, /Author, /Subject, /Keywords, /Creator, /Producer, and both Creation and Modification dates."
            }
        },
        {
            "@type": "Question",
            "name": "Does this remove hidden XMP metadata packets?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Our deep-scrub engine removes XMP metadata packets and /Metadata stream references that many other tools miss entirely."
            }
        },
        {
            "@type": "Question",
            "name": "Is it safe to process sensitive legal documents?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "You don't upload anything. The scrubbing is done 100% locally in your browser. Your document never touches a Standard Convert server."
            }
        },
        {
            "@type": "Question",
            "name": "Why should I remove PDF metadata before sharing?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Metadata can leak your name, your company's software versions, exact creation dates, and even GPS location data hidden in the /Info entries."
            }
        },
        {
            "@type": "Question",
            "name": "Does scrubbing metadata change the look of my PDF?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. The visual content remains identical. We only strip the hidden background data strings that identify document origin."
            }
        },
        {
            "@type": "Question",
            "name": "Can I remove metadata from a password-protected PDF?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "You must unlock the PDF first so the engine can access and scrub the trailer entries and metadata streams."
            }
        },
        {
            "@type": "Question",
            "name": "What are /Info trailer entries?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "These are specific locations in a PDF file's code where document history (Producer, Creator, ModDate) is stored. We purge these completely."
            }
        },
        {
            "@type": "Question",
            "name": "Does removing metadata reduce the PDF file size?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Usually yes, but the reduction is minimal as text-based metadata streams are small compared to image content."
            }
        }
    ]
}

function page() {
    return (
        <div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
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
