import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AnalyticsConsent } from "@/components/privacy/analytics-consent";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_URL,
} from "@/lib/seo";
import { SanityLive } from "@/sanity/lib/live";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Innovate AI HealthLab | Responsible Health Research",
    template: `%s | ${SITE_SHORT_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Health research",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Innovate AI HealthLab | Responsible Health Research",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Innovate AI HealthLab | Responsible Health Research",
    description: SITE_DESCRIPTION,
  },
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="font-sans"
      data-scroll-behavior="smooth"
    >
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <SanityLive includeDrafts={false} />
        <AnalyticsConsent gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        <SpeedInsights />
      </body>
    </html>
  );
}
