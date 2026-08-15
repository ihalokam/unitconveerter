import type { MetadataRoute } from "next";
import { PRIORITY_PAIRS } from "./lib/unit-convert/units-data";

const BASE_URL = "https://standardconvert.com";

type SitemapEntry = Omit<MetadataRoute.Sitemap[number], "url"> & {
  path: string;
};

const STATIC_PAGES: SitemapEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/unit-converter", changeFrequency: "weekly", priority: 0.9 },
  { path: "/bulk-unit-converter", changeFrequency: "weekly", priority: 0.9 },
  { path: "/calculator", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pdf-tools", changeFrequency: "weekly", priority: 0.9 },

  { path: "/bulk-unit-converter/length-unit-converter-in-bulk-csv-excel-files", changeFrequency: "monthly", priority: 0.8 },
  { path: "/bulk-unit-converter/mass-unit-converter-in-bulk-csv-excel-files", changeFrequency: "monthly", priority: 0.8 },
  { path: "/bulk-unit-converter/temperature-unit-converter-in-bulk-csv-excel-files", changeFrequency: "monthly", priority: 0.8 },
  { path: "/bulk-unit-converter/volume-unit-converter-in-bulk-csv-excel-files", changeFrequency: "monthly", priority: 0.8 },
  { path: "/bulk-unit-converter/energy-unit-converter-in-bulk-csv-excel-files", changeFrequency: "monthly", priority: 0.8 },
  { path: "/bulk-unit-converter/pressure-unit-converter-in-bulk-csv-excel-files", changeFrequency: "monthly", priority: 0.8 },

  { path: "/calculator/age-calculator", changeFrequency: "monthly", priority: 0.85 },
  { path: "/calculator/long-youtube-video-earnings-calculator", changeFrequency: "monthly", priority: 0.85 },
  { path: "/calculator/youtube-shorts-earnings-calculator", changeFrequency: "monthly", priority: 0.85 },
  { path: "/calculator/concrete-calculator", changeFrequency: "monthly", priority: 0.85 },

  { path: "/pdf-tools/image-to-pdf-converter", changeFrequency: "monthly", priority: 0.85 },
  { path: "/pdf-tools/markdown-to-pdf", changeFrequency: "monthly", priority: 0.85 },
  { path: "/pdf-tools/merge-pdfs", changeFrequency: "monthly", priority: 0.85 },
  { path: "/pdf-tools/pdf-metadata-remover", changeFrequency: "monthly", priority: 0.85 },

  { path: "/about-us", changeFrequency: "yearly", priority: 0.4 },
  { path: "/contact-us", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = STATIC_PAGES.map(({ path, ...metadata }) => ({
    url: `${BASE_URL}${path}`,
    ...metadata,
  }));

  const conversionPages = PRIORITY_PAIRS.map(({ slug }) => ({
    url: `${BASE_URL}/convert/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...conversionPages];
}
