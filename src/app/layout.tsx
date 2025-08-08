import { ErrorBoundaryWrapper } from "@/wrappers";
import type { Metadata } from "next";
import { Calistoga, Inter } from "next/font/google";
import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import "./globals.css";

interface IRootLayoutProps {
  children: ReactNode;
}

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

export const metadata: Metadata = {
  title: "Muhammad Ahmed Shehzad - Full Stack Developer",
  description:
    "Full Stack Developer specializing in TypeScript, React, Next.js, C#, .NET, and modern web technologies. Building high-quality, user-friendly web applications.",
  keywords: [
    "Full Stack Developer",
    "TypeScript",
    "React",
    "Next.js",
    "C#",
    ".NET",
    "Web Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Muhammad Ahmed Shehzad" }],
  creator: "Muhammad Ahmed Shehzad",
  metadataBase: new URL("https://ahmed-shehzad.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Muhammad Ahmed Shehzad - Full Stack Developer",
    description:
      "Portfolio of Muhammad Ahmed Shehzad, a Full Stack Developer specializing in TypeScript, React, Next.js, C#, .NET, and modern web technologies.",
    url: "https://ahmed-shehzad.github.io/Portfolio",
    siteName: "Muhammad Ahmed Shehzad - Portfolio",
    images: [
      {
        url: "/me.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Ahmed Shehzad - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ahmed Shehzad - Full Stack Developer",
    description:
      "Full Stack Developer specializing in TypeScript, React, Next.js, C#, .NET, and modern web technologies.",
    images: ["/me.jpg"],
    creator: "@ahmed_shehzad", // Replace with actual Twitter handle if available
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
  verification: {
    // google: "verification-token", // Add your Google verification token if you have one
  },
};

/**
 * RootLayout is the main layout component for the application.
 * It wraps all page content with the necessary HTML structure and applies global styles.
 *
 * @param children - The React node(s) to be rendered within the layout.
 * @returns The root HTML structure with applied class names and children content.
 */
const RootLayout: FC<IRootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Structured Data - JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://ahmed-shehzad.github.io/Portfolio/#person",
              name: "Muhammad Ahmed Shehzad",
              alternateName: "Ahmed Shehzad",
              description:
                "Full Stack Developer specializing in TypeScript, React, Next.js, C#, .NET, and modern web technologies",
              url: "https://ahmed-shehzad.github.io/Portfolio",
              image: "https://ahmed-shehzad.github.io/Portfolio/me.jpg",
              sameAs: [
                "https://github.com/Ahmed-Shehzad",
                "https://linkedin.com/in/muhammad-ahmed-shehzad",
              ],
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              knowsAbout: [
                "TypeScript",
                "React",
                "Next.js",
                "C#",
                ".NET",
                "Web Development",
                "Full Stack Development",
                "Software Engineering",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "Pakistan",
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
              "@id": "https://ahmed-shehzad.github.io/Portfolio/#website",
              url: "https://ahmed-shehzad.github.io/Portfolio",
              name: "Muhammad Ahmed Shehzad - Portfolio",
              description:
                "Portfolio of Muhammad Ahmed Shehzad, a Full Stack Developer specializing in modern web technologies",
              publisher: {
                "@type": "Person",
                "@id": "https://ahmed-shehzad.github.io/Portfolio/#person",
              },
              inLanguage: "en-US",
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
        <ErrorBoundaryWrapper>{children}</ErrorBoundaryWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
