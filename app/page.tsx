import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AboutUs from "./Components/HomeComponents/AboutUs";
import UnitConverters from "./Components/HomeComponents/UnitConverters";
import PdfComponent from "./Components/HomeComponents/PdfComponent";
import Calculator from "./Components/Calculator/Calculator";
import SeoContent from "./Components/HomeComponents/SeoContent";
import UnitConv from "./Components/HomeComponents/UnitConv";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Standard Convert – Free Unit Converter & PDF Tools",
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
  alternates: {
    canonical: "https://standardconvert.com",
  },
  openGraph: {
    title: "Standard Convert – Free Unit Converter & PDF Tools",
    description:
      "Free online unit converter and PDF tools. Convert mass, length, temperature, volume and more. Privacy-first, 100% client-side processing with bulk CSV support.",
    url: "https://standardconvert.com",
    siteName: "Standard Convert",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://standardconvert.com/og.webp",
        width: 1200,
        height: 630,
        alt: "Standard Convert – Free Unit Converter & PDF Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Standard Convert – Free Unit Converter & PDF Tools",
    description:
      "Free online unit converter and PDF tools with privacy-first, client-side processing. Bulk CSV support included.",
    images: ["https://standardconvert.com/og.webp"],
  },
};

export default function Home() {
  return (
    <div>
      <Navbar />

      <h1 className="sr-only">Free Online Unit Converter &amp; PDF Tools</h1>
      <UnitConv />
      <AboutUs />
      <UnitConverters />
      <PdfComponent />
      <Calculator />

      <SeoContent />
      <Footer />
    </div>
  );
}
