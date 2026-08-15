import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TotalConv from '../../Components/UnitComponents/TotalConv'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import {
    CATEGORIES, PRIORITY_PAIRS, resolvePairFromSlug, canonicalPairSlug,
    unitDisplayName, convertUnits,
} from '@/app/lib/unit-convert/units-data';

const SITE_URL = 'https://standardconvert.com'

interface PageProps {
    params: Promise<{ pair: string }>
}

// Pre-render every keyword-backed pair at build time.
export async function generateStaticParams() {
    return PRIORITY_PAIRS.map(p => ({ pair: p.slug }))
}

// Allow pairs outside the priority list (e.g. "yards-to-meters") to still
// resolve and render on request instead of 404ing.
export const dynamicParams = true

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { pair } = await params
    const resolved = resolvePairFromSlug(pair)
    if (!resolved) {
        return { title: 'Unit Converter', alternates: { canonical: `${SITE_URL}/unit-converter` } }
    }

    const fromName = unitDisplayName(resolved.categoryKey, resolved.fromKey)
    const toName = unitDisplayName(resolved.categoryKey, resolved.toKey)
    const canonicalSlug = canonicalPairSlug(resolved)
    const url = `${SITE_URL}/convert/${canonicalSlug}`
    const humanPair = pair.replace(/-to-/, ' to ')

    const title = `${fromName} to ${toName} Converter (${humanPair}) — Free & Instant`
    const description = `Convert ${fromName.toLowerCase()} to ${toName.toLowerCase()} instantly with our free ${humanPair} calculator. Includes the formula, worked examples, and a full conversion table.`

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: { title, description, url, siteName: 'StandardConvert' },
        twitter: { card: 'summary_large_image', title, description },
    }
}

function getFormula(categoryKey: string, fromKey: string, toKey: string): string {
    const category = CATEGORIES.find(c => c.key === categoryKey)!
    const fromName = unitDisplayName(categoryKey, fromKey)
    const toName = unitDisplayName(categoryKey, toKey)

    if (categoryKey === 'temperature') {
        if (fromKey === 'c' && toKey === 'f') return `°F = (°C × 9/5) + 32`
        if (fromKey === 'f' && toKey === 'c') return `°C = (°F − 32) × 5/9`
        if (fromKey === 'c' && toKey === 'k') return `K = °C + 273.15`
        if (fromKey === 'k' && toKey === 'c') return `°C = K − 273.15`
        return `Convert via Celsius as the base unit.`
    }

    const fromUnit = category.units.find(u => u.value === fromKey)!
    const toUnit = category.units.find(u => u.value === toKey)!
    const ratio = fromUnit.toBase / toUnit.toBase
    return `1 ${fromName} = ${ratio.toLocaleString('en-US', { maximumFractionDigits: 6 })} ${toName}`
}

export default async function PairConverterPage({ params }: PageProps) {
    const { pair } = await params
    const resolved = resolvePairFromSlug(pair)
    if (!resolved) notFound()

    const { categoryKey, fromKey, toKey } = resolved
    const category = CATEGORIES.find(c => c.key === categoryKey)!
    const fromUnit = category.units.find(u => u.value === fromKey)!
    const toUnit = category.units.find(u => u.value === toKey)!
    const fromName = unitDisplayName(categoryKey, fromKey)
    const toName = unitDisplayName(categoryKey, toKey)
    const formula = getFormula(categoryKey, fromKey, toKey)
    const sampleResult = convertUnits(1, fromUnit, toUnit, category, {}, fromKey, toKey)

    const faqItems = [
        {
            q: `How do I convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}?`,
            a: `${formula}. Enter your value in the calculator above and it converts instantly.`,
        },
        {
            q: `What is 1 ${fromName.toLowerCase()} in ${toName.toLowerCase()}?`,
            a: sampleResult !== null
                ? `1 ${fromName.toLowerCase()} equals ${sampleResult.toLocaleString('en-US', { maximumFractionDigits: 6 })} ${toName.toLowerCase()}.`
                : `Use the calculator above to convert any value between ${fromName.toLowerCase()} and ${toName.toLowerCase()}.`,
        },
        {
            q: `Is the ${fromName.toLowerCase()} to ${toName.toLowerCase()} conversion exact?`,
            a: `Yes — this converter uses the standard defined conversion factor, so results are precise to the decimal places shown.`,
        },
    ]

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
    }

    const webAppSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: `${fromName} to ${toName} Converter`,
        url: `${SITE_URL}/convert/${canonicalPairSlug(resolved)}`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <Navbar />
            <TotalConv initialCategoryKey={categoryKey} initialFromKey={fromKey} initialToKey={toKey} />

            <section className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:px-8">
                <h2 className="mb-3 text-2xl font-bold text-slate-900">
                    {fromName} to {toName} conversion formula
                </h2>
                <p className="mb-6 text-[0.95rem] leading-relaxed text-slate-600">
                    {formula}. To convert {fromName.toLowerCase()} to {toName.toLowerCase()}, use the calculator
                    above — it updates instantly as you type, and you can hit the swap button to reverse
                    the conversion.
                </p>

                <h2 className="mb-6 text-2xl font-bold text-slate-900">Frequently asked questions</h2>
                <div className="flex flex-col gap-5">
                    {faqItems.map(item => (
                        <div key={item.q}>
                            <h3 className="mb-1.5 text-base font-semibold text-slate-800">{item.q}</h3>
                            <p className="text-[0.95rem] leading-relaxed text-slate-600">{item.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </>
    )
}
