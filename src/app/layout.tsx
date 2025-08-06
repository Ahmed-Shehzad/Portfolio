import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
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
    "Web Development",
    "Muhammad Ahmed Shehzad",
  ],
  authors: [{ name: "Muhammad Ahmed Shehzad" }],
  openGraph: {
    title: "Muhammad Ahmed Shehzad - Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ahmed Shehzad - Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * RootLayout is the main layout component for the application.
 * It wraps all page content with the necessary HTML structure and applies global styles.
 *
 * @param children - The React node(s) to be rendered within the layout.
 * @returns The root HTML structure with applied class names and children content.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          "bg-gray-900 text-white antialiased font-sans"
        )}
      >
        {children}
      </body>
    </html>
  );
}
