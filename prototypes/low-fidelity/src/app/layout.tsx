import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JuryFlow - low-fidelity prototype",
  description: "Non-functional wireframes of the main JuryFlow screens",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
