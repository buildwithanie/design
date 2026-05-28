import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IAHL | Innovate AI HealthLab",
  description:
    "IAHL advances health research through AI, innovation, and strategic partnerships for equitable health outcomes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
