import React from 'react'
import type { Metadata } from 'next'
import TotalConv from '../Components/UnitComponents/TotalConv'
import TotalContent from '../Components/UnitComponents/TotalContent'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const PAGE_URL = 'https://standardconvert.com/unit-converter'

export const metadata: Metadata = {
    title: 'Unit Converter — Convert Length, Mass, Volume, Temperature & More',
    description:
        'Free online unit converter for length, mass, temperature, volume, pressure, energy, speed and 12+ categories. Instant, accurate metric and imperial conversions with all-unit results.',
    keywords: [
        'unit converter',
        'unit conversion calculator',
        'unit converter calculator',
        'converter unit',
        'units converter',
        'conversion calculator',
        'metric conversion calculator',
        'measurement converter',
        'length converter calculator',
        'volume conversion calculator',
        'pressure unit converter',
        'convert units',
        'imperial to metric converter',
        'metric to imperial conversion',
        'size converter',
        'dimension converter',
    ],
    alternates: { canonical: PAGE_URL },
    robots: { index: true, follow: true },
    openGraph: {
        type: 'website',
        title: 'Unit Converter — Convert Any Unit Instantly',
        description:
            'Convert length, mass, temperature, volume, energy, pressure, speed, data and more in one free online unit conversion calculator.',
        url: PAGE_URL,
        siteName: 'StandardConvert',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Unit Converter — Convert Any Unit Instantly',
        description:
            'Free online unit converter covering length, mass, temperature, volume, pressure, energy and more.',
    },
}

// ─── Structured data ───────────────────────────────────────────────────────
// WebApplication schema tells search engines this is a functional tool, not
// just an article — this is what earns the "calculator/tool" rich treatment
// in results rather than a plain blue link.

const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'StandardConvert Unit Converter',
    url: PAGE_URL,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    description:
        'Free online unit converter for length, mass, temperature, volume, area, speed, time, energy, power, pressure, data, angle, fuel economy, currency and frequency.',
}

// FAQPage schema — matched to the exact high-volume queries people search
// (lbs to kg, cm to feet, m to cm, etc.). Google requires this content to
// also be visible on the page, so it's rendered below, not hidden.
const faqItems = [
    {
        q: 'How do I convert pounds (lbs) to kilograms (kg)?',
        a: 'Multiply the value in pounds by 0.45359237 to get kilograms. For example, 10 lbs × 0.45359237 = 4.5359 kg.',
    },
    {
        q: 'How do I convert centimeters (cm) to feet?',
        a: 'Divide the value in centimeters by 30.48 to get feet. For example, 180 cm ÷ 30.48 ≈ 5.91 ft.',
    },
    {
        q: 'How do I convert meters (m) to centimeters (cm)?',
        a: 'Multiply the value in meters by 100. For example, 2.5 m × 100 = 250 cm.',
    },
    {
        q: 'How do I convert inches to meters?',
        a: 'Multiply the value in inches by 0.0254 to get meters. For example, 40 in × 0.0254 = 1.016 m.',
    },
    {
        q: 'What is the difference between metric and imperial units?',
        a: 'Metric units (meters, kilograms, liters) scale in powers of 10 and are used almost worldwide. Imperial units (feet, pounds, gallons) are still standard in the US for everyday measurement.',
    },
    {
        q: 'Is this unit converter free to use?',
        a: 'Yes. All conversions across every category — length, mass, temperature, volume, pressure, energy, speed, data, and currency — are free with no sign-up required.',
    },
]

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
        },
    })),
}

export default function AllInOneConverterPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <Navbar />
            <TotalConv />
            <TotalContent />

            {/* Visible FAQ block — mirrors faqSchema above so the structured
                data stays valid, and directly targets high-volume long-tail
                queries like "lbs to kg", "cm to feet", "m to cm". */}
            <section className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:px-8">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                    Frequently asked questions
                </h2>
                <div className="flex flex-col gap-5">
                    {faqItems.map(item => (
                        <div key={item.q}>
                            <h3 className="mb-1.5 text-base font-semibold text-slate-800">
                                {item.q}
                            </h3>
                            <p className="text-[0.95rem] leading-relaxed text-slate-600">
                                {item.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </>
    )
}