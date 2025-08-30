import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Resume - Muhammad Ahmed Shehzad",
  description: "Software Engineer with 5+ years of experience in full-stack development",
};

export const viewport: Viewport = {
  width: "1024",
  initialScale: 0.5,
  userScalable: true,
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
