import type { Metadata } from 'next'

import Navbar from '@/app/Components/Navbar'
import Footer from '@/app/Components/Footer'
import Hero from '@/app/Components/PDFtools/md-pdf/Hero'
import ConverterWorkspace from '@/app/Components/PDFtools/md-pdf/Converterworkspace'
import FeatureGaps from '@/app/Components/PDFtools/md-pdf/Featuregaps'
import Faq from '@/app/Components/PDFtools/md-pdf/Faq'
import Trust from '@/app/Components/PDFtools/md-pdf/Trust'

const pageUrl =
    'https://standardconvert.com/pdf-tools/markdown-to-pdf'

export const metadata: Metadata = {
    title: 'Markdown to PDF Converter | MD to PDF',
    description:
        'Convert Markdown to PDF online with our free MD to PDF converter. Convert .md files to PDF quickly and easily.',

    keywords: [
        'md to pdf',
        'markdown to pdf',
        'markdown转pdf',
        'md转pdf',
        'md to pdf converter',
        'md file to pdf',
        'md文件转pdf',
    ],

    alternates: {
        canonical: pageUrl,
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: 'Markdown to PDF Converter | MD to PDF',
        description:
            'Convert Markdown files to PDF online quickly and easily with Standard Convert.',
        url: pageUrl,
        siteName: 'Standard Convert',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Markdown to PDF Converter | MD to PDF',
        description:
            'Convert Markdown files to PDF online quickly and easily with Standard Convert.',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Markdown to PDF Converter',
    url: pageUrl,
    description:
        'Free online Markdown to PDF converter. Convert Markdown and MD files to PDF quickly and easily.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
}

export default function Page() {
    return (
        <>
            {/* Structured data for search engines */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />

            <div className="flex min-h-screen flex-col">
                <Navbar />

                <main className="flex-grow">
                    <Hero />
                    <ConverterWorkspace />
                    <Trust />
                    <FeatureGaps />
                    <Faq />
                </main>

                <Footer />
            </div>
        </>
    )
}