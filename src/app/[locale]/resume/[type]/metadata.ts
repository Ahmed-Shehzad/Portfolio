import { getLocalizedResumeMetadata, isValidResumeType } from "@/features/resume";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface GenerateMetadataProps {
  params: Promise<{ locale: string; type: string }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { locale, type } = await params;

  if (!isValidResumeType(type)) {
    notFound();
  }

  const metadata = await getLocalizedResumeMetadata(type, locale);

  const baseUrl = "https://portfolio-azure-five-75.vercel.app";

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords],
    authors: [{ name: "Muhammad Ahmed Shehzad" }],
    creator: "Muhammad Ahmed Shehzad",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}/resume/${type}`,
      languages: {
        en: `/en/resume/${type}`,
        de: `/de/resume/${type}`,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/${locale}/resume/${type}`,
      siteName: "Muhammad Ahmed Shehzad - Portfolio",
      images: [
        {
          url: "/me.jpg",
          width: 1200,
          height: 630,
          alt: `${metadata.title} - Resume`,
        },
      ],
      locale: locale === "de" ? "de_DE" : "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: ["/me.jpg"],
      creator: "@ahmed_shehzad",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
