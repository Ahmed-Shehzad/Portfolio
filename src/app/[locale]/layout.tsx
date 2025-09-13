// Direct import instead of barrel to avoid any potential circular or undefined export issues
import { QueryProvider } from "@/lib/query/provider";
import { ErrorBoundaryWrapper } from "@/wrappers/ErrorBoundaryWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Calistoga, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import "../globals.css";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// Constants to avoid duplication
const PORTFOLIO_URL = "https://portfolio-azure-five-75.vercel.app";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  display: "swap",
  preload: true,
});

// Validate that the incoming locale parameter is valid
function isValidLocale(locale: string): locale is "en" | "de" {
  return ["en", "de"].includes(locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations("metadata");

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
    authors: [{ name: t("author") }],
    creator: t("author"),
    metadataBase: new URL(PORTFOLIO_URL),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        de: "/de",
      },
    },
    openGraph: {
      title: t("openGraph.title"),
      description: t("description"),
      url: PORTFOLIO_URL,
      siteName: t("openGraph.siteName"),
      images: [
        {
          url: "/me.jpg",
          width: 1200,
          height: 630,
          alt: t("openGraph.imageAlt"),
        },
      ],
      locale: locale === "de" ? "de_DE" : "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
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

/**
 * RootLayout Component
 *
 * The main layout wrapper that provides:
 * - Global styling (fonts, background, etc.)
 * - Error boundary for graceful error handling
 * - Query provider for React Query state management
 * - Analytics and performance monitoring
 * - Internationalization support
 * - Structured data for SEO
 *
 * @param children - The child components to be rendered within the layout.
 * @returns The root HTML structure with applied class names and children content.
 */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate that the incoming locale parameter is valid
  if (!isValidLocale(locale)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <head>
        {/* Font preconnect links are handled by Next.js font optimization */}

        {/* Structured Data - JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${PORTFOLIO_URL}/#person`,
              name: "Muhammad Ahmed Shehzad",
              alternateName: "Ahmed Shehzad",
              description:
                "Full Stack Developer specializing in TypeScript, React, Next.js, C#, .NET, and modern web technologies",
              url: PORTFOLIO_URL,
              image: `${PORTFOLIO_URL}/me.jpg`,
              sameAs: [
                "https://github.com/Ahmed-Shehzad",
                "https://www.linkedin.com/in/muhammad-ahmed-shehzad-66750989/",
              ],
              jobTitle: "Backend Developer & Full Stack Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              knowsAbout: [
                "C#",
                ".NET",
                "TypeScript",
                "React",
                "Next.js",
                "Backend Development",
                "API Design",
                "Database Architecture",
                "Full Stack Development",
                "Software Engineering",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "Deutschland",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${PORTFOLIO_URL}/#website`,
              url: PORTFOLIO_URL,
              name: "Muhammad Ahmed Shehzad - Portfolio",
              description:
                "Portfolio of Muhammad Ahmed Shehzad, a Full Stack Developer specializing in modern web technologies",
              publisher: {
                "@type": "Person",
                "@id": `${PORTFOLIO_URL}/#person`,
              },
              inLanguage: locale === "de" ? "de-DE" : "en-GB",
            }),
          }}
        />
      </head>
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          "bg-gray-900 font-sans text-white antialiased"
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundaryWrapper>
            <QueryProvider>{children}</QueryProvider>
          </ErrorBoundaryWrapper>
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
