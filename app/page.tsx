import ToolIndex from "./Components/HomeComponents/ToolIndex";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Standard Convert – fully client side running tools",
  description:
    "Unit convters, PDF ttols, calculators and more... everyhting run on your computer. Privacy first",
  keywords: [
    "unit converter",
    "bulk unit converter",
    "PDF tools",
    "calculators"
  ],
  alternates: {
    canonical: "https://standardconvert.com",
  },
  openGraph: {
    title: "Standard Convert – fully client side running tools",
    description:
      "Unit convters, PDF ttols, calculators and more... everyhting run on your computer. Privacy first",
    url: "https://standardconvert.com",
    siteName: "Standard Convert",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://standardconvert.com/og.webp",
        width: 1200,
        height: 630,
        alt: "Standard Convert – Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Standard Convert – fully client side running tools",
    description:
      "Unit convters, PDF ttols, calculators and more... everyhting run on your computer. Privacy first",

  },
};

export default function Home() {
  return <ToolIndex />;
}

