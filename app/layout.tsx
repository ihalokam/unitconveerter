import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://standardconvert.com"),
  title: {
    default: "Standard Convert – Unit Converter (Single & Bulk, Fast & Free)",
    template: "%s | Standard Convert",
  },

  description:
    "Convert units instantly with Standard Convert. Supports quick single conversions and powerful bulk conversion via CSV across length, mass, temperature, volume, energy and more.",

  keywords: [
    "unit converter",
    "batch conversion",
    "bulk unit converter",
    "CSV unit converter",
    "mass converter",
    "length converter",
    "temperature converter",
    "volume converter",
    "energy converter",
    "pressure converter",
    "measurement calculator",
    "online conversion tool",
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
    "Free bulk and single unit converter for mass, length, temperature, volume, energy and pressure. Supports CSV batch conversion.",
  featureList: [
    "Mass unit conversion",
    "Length unit conversion",
    "Temperature unit conversion",
    "Volume unit conversion",
    "Energy unit conversion",
    "Pressure unit conversion",
    "Bulk CSV conversion",
    "Excel XLSX export",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
