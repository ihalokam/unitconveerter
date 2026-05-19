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
    title: 'Image to PDF Converter – Private & Local | Standard Convert',
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
    openGraph: {
        title: 'Image to PDF Converter – Private & Local | Standard Convert',
        description: 'Convert PNG, JPG, and WebP to PDF with 100% privacy. No server uploads. Professional layout control (A4, Letter) with bulk support.',
        url: 'https://standardconvert.com/pdf-tools/image-to-pdf-converter',
        siteName: 'Standard Convert',
        type: 'website',
        images: [{ url: 'https://standardconvert.com/og.webp', width: 1200, height: 630, alt: 'Image to PDF Converter – Standard Convert' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Image to PDF Converter – Private & Local',
        description: 'Convert PNG, JPG, and WebP to PDF with 100% privacy. No server uploads needed.',
        images: ['https://standardconvert.com/og.webp'],
    },
}

const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image to PDF Converter",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "url": "https://standardconvert.com/pdf-tools/image-to-pdf-converter",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Convert PNG, JPG, and WebP images into a single PDF document. 100% local browser processing, no server uploads. Supports bulk drag-and-drop, page reordering, and A4/Letter/Legal layout selection.",
    "featureList": [
        "Drag-and-drop multi-image upload",
        "A4, Letter, and Legal page layout",
        "High-resolution DPI preservation",
        "Grayscale mode for ink savings",
        "Zero server uploads",
        "Offline capable"
    ]
}

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Is it safe to convert my sensitive images to PDF on Standard Convert?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Standard Convert uses a 'Zero-Server' architecture. Your images are never uploaded; the conversion happens entirely within your browser's local memory, ensuring your sensitive data never leaves your device."
            }
        },
        {
            "@type": "Question",
            "name": "Can I use Standard Convert without an internet connection?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Once the tool is loaded, Standard Convert operates locally. You can convert PNG, JPG, and WebP files to PDF completely offline, making it ideal for secure, low-connectivity environments."
            }
        },
        {
            "@type": "Question",
            "name": "What is the file size limit for Standard Convert?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We do not impose artificial file size limits. Since Standard Convert utilizes your local machine's hardware for processing, your only limit is the available RAM on your computer or mobile device."
            }
        },
        {
            "@type": "Question",
            "name": "How does Standard Convert handle multiple file merges?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can drag and drop dozens of files simultaneously. Standard Convert allows you to reorder these pages visually before generating the final PDF to ensure a professional sequence."
            }
        },
        {
            "@type": "Question",
            "name": "Will my PDF output be high-resolution?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Standard Convert is engineered for industrial precision. By selecting our 'High' quality setting, the PDF preserves the original DPI of your source images for crisp, clear documentation."
            }
        },
        {
            "@type": "Question",
            "name": "Is there a cost to use the professional layout features?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Standard Convert provides professional-grade layout control—including A4, Letter, and Legal sizing—completely free. Our goal is to provide a reliable utility for global engineering standards."
            }
        },
        {
            "@type": "Question",
            "name": "Does Standard Convert collect any metadata?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Our privacy-by-design approach means we do not collect metadata, proprietary schemas, or personal identifying information. Your workflow is completely anonymous."
            }
        },
        {
            "@type": "Question",
            "name": "How do I ensure my PDFs are ink-friendly for printing?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Standard Convert includes a 'Grayscale' toggle in the optimization panel, allowing you to convert colored photos into black-and-white PDFs, saving ink and creating a clean scanned look."
            }
        },
        {
            "@type": "Question",
            "name": "Is Standard Convert compatible with mobile browsers?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. It is fully optimized for mobile Chrome and Safari. You get the same local-processing power on your phone as you do on a desktop, without needing to install an app."
            }
        },
        {
            "@type": "Question",
            "name": "Why should I choose Standard Convert over other online tools?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Standard Convert is the only tool that combines 'Zero-Server' privacy with high-precision industrial layout controls. It is built for professionals who cannot risk data exposure on cloud servers."
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
