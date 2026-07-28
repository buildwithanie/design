import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PublicationsArchive } from "@/components/media/publications-archive";
import { sanityFetch } from "@/sanity/lib/live";
import {
  PUBLICATIONS_PAGE_QUERY,
  PUBLICATIONS_QUERY,
} from "@/sanity/lib/queries";
import type {
  PUBLICATIONS_PAGE_QUERY_RESULT,
  PUBLICATIONS_QUERY_RESULT,
} from "@/sanity.types";
import { MediaArchiveIntro } from "@/components/media/media-intro";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: PUBLICATIONS_PAGE_QUERY,
    stega: false,
  });

  const publicationsPage = data as PUBLICATIONS_PAGE_QUERY_RESULT;

  if (!publicationsPage) {
    notFound();
  }

  const title = `${publicationsPage.publicationsArchiveLabel} | Innovate AI HealthLab`;
  const description = publicationsPage.publicationsArchiveDescription;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Innovate AI HealthLab",
    },

    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function PublicationsPage() {
  const [{ data: publicationsPageData }, { data: publicationsData }] =
    await Promise.all([
      sanityFetch({
        query: PUBLICATIONS_PAGE_QUERY,
      }),

      sanityFetch({
        query: PUBLICATIONS_QUERY,
      }),
    ]);

  const publicationsPage =
    publicationsPageData as PUBLICATIONS_PAGE_QUERY_RESULT;

  const publications = publicationsData as PUBLICATIONS_QUERY_RESULT;

  if (!publicationsPage || publications.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <MediaArchiveIntro
        label={publicationsPage.publicationsArchiveLabel}
        heading={publicationsPage.publicationsArchiveHeading}
        description={publicationsPage.publicationsArchiveDescription}
        backHref="/media"
        backLabel="Media Center"
      />

      <PublicationsArchive items={publications} />
    </main>
  );
}
