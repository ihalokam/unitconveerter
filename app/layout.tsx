import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";

// GeistSans and GeistMono are pre-configured with their CSS variable names
// when imported from the 'geist' package — no further setup needed.

export const metadata: Metadata = {
  metadataBase: new URL("https://standardconvert.com"),
  title: {
    default: "Standard Convert – Free Tools for Everyday Life",
    template: "%s | Standard Convert",
  },

  description:
    "Free online unit converter and PDF tools. Convert mass, length, temperature, volume and more. Privacy-first, 100% client-side processing with bulk CSV support.",

  keywords: [
    "unit converter",
    "bulk unit converter",
    "PDF tools",
    "image to PDF",
    "PDF metadata remover",
    "mass converter",
    "length converter",
    "temperature converter",
    "volume converter",
    "energy converter",
    "free online tools",
    "privacy-first tools",
  ],

  authors: [{ name: "Standard Convert Team" }],


  openGraph: {
    title: "Standard Convert – All-in-One Unit Converter",
    description:
      "Fast single conversions or bulk CSV unit conversion in seconds. Accurate, free, and easy to use.",
    url: "https://standardconvert.com",
    siteName: "Standard Convert",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://standardconvert.com/og.webp",
        width: 1200,
        height: 630,
        alt: "Standard Convert – Free Bulk Unit Converter Tool",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Standard Convert – Free Multi-Unit Converter",
    description:
      "Instant unit conversions for mass, length, volume, temperature, energy & pressure. Bulk CSV support included.",
    images: ["https://standardconvert.com/og.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Standard Convert",
  url: "https://standardconvert.com",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free online tools for everyday life. Convert units in bulk or one at a time, remove PDF metadata, convert images to PDF, and calculate YouTube earnings — all 100% locally in your browser. No uploads, no tracking.",
  featureList: [
    "unit converter",
    "Bulk CSV conversion",
    "Excel XLSX export",
    "PDF metadata remover",
    "Image to PDF converter",
    "YouTube long video earnings calculator",
    "YouTube Shorts earnings calculator",
    "Privacy-first, 100% client-side processing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      {/* Google Analytics */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-7JHDT0CC55"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7JHDT0CC55');
        `}
      </Script>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
