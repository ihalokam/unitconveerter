import Navbar from "@/app/Components/Navbar"
import type { Metadata } from 'next'
import Footer from "@/app/Components/Footer"
import Calculator from "@/app/Components/Calculator/LongVideoEarnings/Calculator"
import HeadingOne from "@/app/Components/Calculator/LongVideoEarnings/HeadingOne"
import HowTo from "@/app/Components/Calculator/LongVideoEarnings/HowTo"
import Table from "@/app/Components/Calculator/LongVideoEarnings/Table"
import LanguageTable from "@/app/Components/Calculator/LongVideoEarnings/LanguageTable"
import NicheTable from "@/app/Components/Calculator/LongVideoEarnings/NicheTable"
import VidLengthTable from "@/app/Components/Calculator/LongVideoEarnings/VidLengthTable"
import Faq from "@/app/Components/Calculator/LongVideoEarnings/Faq"
import Link from "@/app/Components/Calculator/LongVideoEarnings/Link"

export const metadata: Metadata = {
    title: "YouTube Long Video Earnings Calculator",
    description: "Estimate YouTube long-form video earnings by country, niche, and video duration. Uses 2026 creator-reported RPM data. See how much your videos could earn.",
    alternates: {
        canonical: "https://standardconvert.com/calculator/long-youtube-video-earnings-calculator"
    },
    keywords: [
        "YouTube earnings calculator",
        "YouTube long video revenue calculator",
        "how much more do long youtube videos make",
        "highest paying niches for long youtube videos",
        "youtube long video rpm by country",
        "us audience vs india audience youtube payout calculator",
        "youtube rpm ranked by country and language",
    ],
    openGraph: {
        title: "YouTube Long-Form Video Earnings Calculator | Standard Convert",
        description: "Estimate YouTube long-form video earnings by country, niche, and video duration. Uses 2026 creator-reported RPM data.",
        url: "https://standardconvert.com/calculator/long-youtube-video-earnings-calculator",
        siteName: "Standard Convert",
        type: "website",
        images: [{ url: "https://standardconvert.com/og.webp", width: 1200, height: 630, alt: "YouTube Long Video Earnings Calculator" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "YouTube Long-Form Video Earnings Calculator",
        description: "Estimate YouTube long-form video earnings by country, niche, and video duration using 2026 RPM data.",
        images: ["https://standardconvert.com/og.webp"],
    },
}

const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "YouTube Long Video Earnings Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "url": "https://standardconvert.com/calculator/long-youtube-video-earnings-calculator",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Estimate YouTube long-form video ad revenue by country, niche, and video duration using 2026 creator-reported RPM data. Includes countrywide RPM tables, niche multipliers, and duration-based comparisons.",
    "featureList": [
        "Country-specific RPM estimates",
        "Niche multiplier table",
        "Video duration revenue comparison chart",
        "2026 creator-reported data"
    ]
}

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "YouTube Revenue Calculator",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use the calculator above to estimate your average YouTube revenue by entering your monthly views, audience region, niche, and average video duration."
            }
        },
        {
            "@type": "Question",
            "name": "How much does YouTube pay for 1 million views?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "YouTube earnings for 1 million views can vary widely depending on the audience country, niche, video length, and engagement. On average, creators may earn anywhere from $1,000 to $20,000 or more. You can use this calculator to estimate earnings for 1M, 100K, or even 1,000 views."
            }
        },
        {
            "@type": "Question",
            "name": "How much does a YouTuber with 100K subscribers make?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Subscriber count does not directly determine YouTube earnings. Revenue mainly depends on views, audience location, niche, watch time, and ad rates. Subscribers help creators get more consistent views and engagement."
            }
        },
        {
            "@type": "Question",
            "name": "How much money does MrBeast make?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "MrBeast is estimated to earn millions of dollars per month from YouTube ad revenue alone. His videos regularly generate hundreds of millions of views, in addition to sponsorships, merchandise, and other business ventures."
            }
        },
        {
            "@type": "Question",
            "name": "YouTube payment in India / US / UK?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "YouTube RPM and CPM rates vary significantly by country. Generally, creators in the US, UK, and Canada earn higher ad revenue compared to many other regions. Use the calculator to estimate earnings based on your audience country."
            }
        },
        {
            "@type": "Question",
            "name": "What are the highest-paying YouTube niches?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Finance, investing, business, technology, AI, and software-related content are among the highest-paying YouTube niches due to strong advertiser demand and higher CPM rates."
            }
        },
        {
            "@type": "Question",
            "name": "What is a good YouTube RPM?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A good YouTube RPM depends on the content niche and audience location. For entertainment or gaming channels, an RPM of $1–$3 is common, while finance or SaaS channels may achieve $10–$25 or more. In general, anything above $5 RPM is considered strong for a global audience."
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
            <HeadingOne />
            <Calculator />
            <Link />
            <HowTo />
            <Table />
            <LanguageTable />
            <NicheTable />
            <VidLengthTable />
            <Faq />
            <Footer />
        </div>
    )
}

export default page