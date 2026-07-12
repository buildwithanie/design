import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MultimediaArchive } from "@/components/media/multimedia-archive";
import { sanityFetch } from "@/sanity/lib/live";
import { MULTIMEDIA_PAGE_QUERY, MULTIMEDIA_QUERY } from "@/sanity/lib/queries";
import type {
  MULTIMEDIA_PAGE_QUERY_RESULT,
  MULTIMEDIA_QUERY_RESULT,
} from "@/sanity.types";
import { MediaArchiveIntro } from "@/components/media/media-intro";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: MULTIMEDIA_PAGE_QUERY,
    stega: false,
  });

  const multimediaPage = data as MULTIMEDIA_PAGE_QUERY_RESULT;

  if (!multimediaPage) {
    notFound();
  }

  const title = `${multimediaPage.multimediaArchiveLabel} | Innovate AI HealthLab`;
  const description = multimediaPage.multimediaArchiveDescription;

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

export default async function MultimediaPage() {
  const [{ data: multimediaPageData }, { data: multimediaItemsData }] =
    await Promise.all([
      sanityFetch({
        query: MULTIMEDIA_PAGE_QUERY,
      }),

      sanityFetch({
        query: MULTIMEDIA_QUERY,
      }),
    ]);

  const multimediaPage = multimediaPageData as MULTIMEDIA_PAGE_QUERY_RESULT;

  const multimediaItems = multimediaItemsData as MULTIMEDIA_QUERY_RESULT;

  if (!multimediaPage || multimediaItems.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <MediaArchiveIntro
        label={multimediaPage.multimediaArchiveLabel}
        heading={multimediaPage.multimediaArchiveHeading}
        description={multimediaPage.multimediaArchiveDescription}
      />

      <MultimediaArchive items={multimediaItems} />
    </main>
  );
}
