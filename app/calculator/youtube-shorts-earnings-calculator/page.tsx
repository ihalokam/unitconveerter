import React from 'react'
import type { Metadata } from 'next'
import Navbar from '@/app/Components/Navbar'
import Footer from '@/app/Components/Footer'
import Calcluator from '@/app/Components/Calculator/ShortsEarnings/Calculator'
import Slider from '@/app/Components/Calculator/ShortsEarnings/Slider'
import Table from '@/app/Components/Calculator/ShortsEarnings/Table'
import HowTo from '@/app/Components/Calculator/ShortsEarnings/HowTo'
import Faq from '@/app/Components/Calculator/ShortsEarnings/Faq'
import HeaderOne from '@/app/Components/Calculator/ShortsEarnings/HeaderOne'
import HeaderTwo from '@/app/Components/Calculator/ShortsEarnings/HeaderTwo'
import Link from '@/app/Components/Calculator/ShortsEarnings/Link'

export const metadata: Metadata = {
    title: "YouTube Shorts Earnings Calculator",
    description: "Estimate YouTube Shorts revenue by country with 2026 RPM data. See daily, monthly, and yearly earnings for creators worldwide. Based on real creator-reported data.",
    alternates: {
        canonical: "https://standardconvert.com/calculator/youtube-shorts-earnings-calculator"
    },
    keywords: [
        "YouTube shorts earnings calculator",
        "youtube shorts rpm ranked country-wise",
        "How is Shorts revenue estimated",
        "How much youtube shorts pays per 1000 views",
        "How much youtube shorts pays per million views",
        "youtube shorts ad revenue calculator"
    ],
    openGraph: {
        title: "YouTube Shorts Earnings Calculator ",
        description: "Estimate YouTube Shorts revenue by country with 2026 RPM data. See daily, monthly, and yearly earnings for creators worldwide.",
        url: "https://standardconvert.com/calculator/youtube-shorts-earnings-calculator",
        siteName: "Standard Convert",
        type: "website",
        images: [{ url: "https://standardconvert.com/og.webp", width: 1200, height: 630, alt: "YouTube Shorts Earnings Calculator" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "YouTube Shorts Earnings Calculator",
        description: "Estimate YouTube Shorts revenue by country with 2026 RPM data.",
        images: ["https://standardconvert.com/og.webp"],
    },
}

const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "YouTube Shorts Earnings Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "url": "https://standardconvert.com/calculator/youtube-shorts-earnings-calculator",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Estimate YouTube Shorts revenue by country using 2026 creator-reported RPM data. Supports the top 20 global creator regions with daily, monthly, and yearly earning projections.",
    "featureList": [
        "Top 20 country RPM estimates for Shorts",
        "Daily, monthly and yearly revenue projections",
        "2026 creator-reported RPM data",
        "YouTube Premium revenue included"
    ]
}

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why are we different from SocialBlade?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "SocialBlade is mostly limited to long-form video revenue. It often combines long-form and Shorts data together, treating them as the same, which makes the estimates very inaccurate. We decided to solve that problem by creating a webpage exclusively designed to estimate YouTube Shorts revenue."
            }
        },
        {
            "@type": "Question",
            "name": "How did we get the countrywide RPM data?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We conducted a survey through various platforms like Reddit and reached out to creators globally to gain a clear overview of actual RPM data across different territories."
            }
        },
        {
            "@type": "Question",
            "name": "How is Shorts revenue estimated?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our formula includes the standard YouTube Ad Revenue sharing pool, plus additional factors like Product Tagging bonuses and YouTube Premium contributions."
            }
        },
        {
            "@type": "Question",
            "name": "What is YouTube RPM?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "RPM (Revenue Per Mille) represents how much money you earn per 1,000 views. Unlike CPM (which is what advertisers pay), RPM is a creator-focused metric that shows your actual take-home pay after YouTube's revenue cut."
            }
        },
        {
            "@type": "Question",
            "name": "Which countries' revenue can I estimate here?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We currently support the top 20 global user regions: United States, India, Brazil, Indonesia, Mexico, Japan, Germany, Vietnam, Philippines, Turkey, Pakistan, United Kingdom, Egypt, France, Bangladesh, Thailand, South Korea, Italy, Spain, and Canada."
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
            <HeaderOne />
            <Calcluator />
            <Link />
            <HeaderTwo />
            <Slider />
            <Table />
            <HowTo />
            <Faq />
            <Footer />
        </div>

    )
}

export default page
