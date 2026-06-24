// app/pdf-merge/page.tsx  (or wherever your route lives)
// All sections except PDFMergeHero are server-rendered for SEO.

import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/app/Components/Navbar';
import Footer from '@/app/Components/Footer';
import PageHero from '@/app/Components/PDFtools/pdf-merge/PageHero';
import MergeToolSection from '@/app/Components/PDFtools/pdf-merge/MergeToolSection';
import HowItWorks from '@/app/Components/PDFtools/pdf-merge/HowItWorks';
import PrivacyNote from '@/app/Components/PDFtools/pdf-merge/PrivacyNote';

export const metadata: Metadata = {
    title: 'Merge PDF Files Online — Free, Private, No Upload',
    description:
        'Combine multiple PDF files into one in the order you choose. 100% browser-side processing — your files never leave your device. Free, instant, no account required.',
    keywords: [
        'merge pdf',
        'combine pdf',
        'pdf merger',
        'free pdf merge',
        'pdf merge online',
        'no upload pdf tool',
        'client side pdf',
    ],
    openGraph: {
        title: 'Merge PDF Files Online — Free & Private',
        description:
            'Drag, reorder, and merge PDF files entirely in your browser. Zero uploads, zero servers.',
        type: 'website',
    },
};

export default function PDFMergePage() {
    return (
        <div>
            <Navbar />

            {/* Server-rendered: headline + trust badges — indexed by crawlers */}
            <PageHero />

            {/* Server wrapper with client 'use client' hero inside */}
            <MergeToolSection />

            {/* Server-rendered: SEO content about the 3-step process */}
            <HowItWorks />

            {/* Server-rendered: privacy/trust copy */}
            <PrivacyNote />

            <Footer />
        </div>
    );
}