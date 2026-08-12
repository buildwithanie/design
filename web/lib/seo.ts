import type { Metadata } from "next";

export const SITE_NAME = "Innovate AI HealthLab";
export const SITE_SHORT_NAME = "IAHL";
export const SITE_URL = "https://innovateaihealthlab.co.ke";
export const SITE_DESCRIPTION =
  "Innovate AI HealthLab advances responsible, locally relevant health research through artificial intelligence, community knowledge, and research partnerships.";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = `${title} | ${SITE_SHORT_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_KE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

type OrganizationJsonLdDetails = {
  publicEmail?: string | null;
  postalAddress?: string | null;
  phone?: string | null;
};

export function createOrganizationJsonLd({
  publicEmail,
  postalAddress,
  phone,
}: OrganizationJsonLdDetails) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: SITE_SHORT_NAME,
        url: SITE_URL,
        logo: absoluteUrl("/images/iahl-logo.jpeg"),
        ...(publicEmail ? { email: publicEmail } : {}),
        ...(postalAddress
          ? {
              address: {
                "@type": "PostalAddress",
                streetAddress: postalAddress,
                addressCountry: "KE",
              },
            }
          : {}),
        ...(phone ? { telephone: phone } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: SITE_SHORT_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-KE",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
    ],
  };
}
