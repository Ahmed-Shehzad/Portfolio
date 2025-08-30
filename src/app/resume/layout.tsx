import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume - Muhammad Ahmed Shehzad",
  description: "Software Engineer with 5+ years of experience in full-stack development",
  viewport: "width=1024, initial-scale=0.5, user-scalable=yes",
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
