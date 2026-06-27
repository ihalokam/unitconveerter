import React from 'react'
import { Metadata } from 'next'
import Navbar from '@/app/Components/Navbar'
import Footer from '@/app/Components/Footer'
import Hero from '@/app/Components/PDFtools/md-pdf/Hero'
import ConverterWorkspace from '@/app/Components/PDFtools/md-pdf/Converterworkspace'
import FeatureGaps from '@/app/Components/PDFtools/md-pdf/Featuregaps'
import Faq from '@/app/Components/PDFtools/md-pdf/Faq'

// 1. Define Static SEO Metadata
export const metadata: Metadata = {
    title: 'Markdown to PDF Converter | Render Mermaid & LaTeX Natively',
    description: 'Convert Markdown (.md) files to high-quality PDFs entirely in your browser. Seamlessly renders Mermaid diagrams, KaTeX math equations, and preserves clean page breaks.',
    keywords: [
        'markdown to pdf',
        'convert md to pdf',
        'markdown mermaid to pdf',
        'latex markdown converter',
        'browser markdown pdf',
        'standard convert'
    ],
    alternates: {
        canonical: 'https://standardconvert.com/pdf-tools/markdown-to-pdf',
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Markdown to PDF Converter | Render Mermaid & LaTeX Natively',
        description: 'Convert Markdown (.md) files to high-quality PDFs entirely in your browser. Seamlessly renders Mermaid diagrams, KaTeX math equations, and preserves clean page breaks.',
        url: 'https://standardconvert.com/pdf-tools/markdown-to-pdf',
        siteName: 'Standard Convert',
        type: 'website',
        images: [{ url: 'https://standardconvert.com/og.webp', width: 1200, height: 630, alt: 'Markdown to PDF Converter – Standard Convert' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Markdown to PDF Converter | Mermaid & LaTeX Support',
        description: 'Convert .md files to PDF in your browser. Renders Mermaid diagrams, KaTeX math, and clean page breaks. No uploads.',
        images: ['https://standardconvert.com/og.webp'],
    },

}

export default function Page() {
    // 2. Structured Data (Schema.org) for WebApplication
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Markdown to PDF Converter',
        'description': 'A free client-side tool to convert Markdown documentation into PDF files while preserving Mermaid diagrams, code fences, and LaTeX formatting.',
        'url': 'https://standardconvert.com/pdf-tools/markdown-to-pdf',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'All',
        'browserRequirements': 'Requires HTML5 support',
        'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
        }
    }

    return (
        <>
            {/* Injecting Structured Data directly for search engine spiders */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Semantic main wrapper around the interactive workspace */}
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Hero />
                    <ConverterWorkspace />
                    <FeatureGaps />
                    <Faq />
                </main>
                <Footer />
            </div>
        </>
    )
}