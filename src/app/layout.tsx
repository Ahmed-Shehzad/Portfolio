import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// This is a minimal root layout that just provides the HTML structure
export default function RootLayout({ children }: Props) {
  return children;
}
