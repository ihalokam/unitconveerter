import { FAQS } from "./faqData";

export default function JsonLd() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };

    const appSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Age Calculator",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        url: "https://standardconverter.com/calculator/age-calculator",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
        </>
    );
}
