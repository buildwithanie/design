import { notFound } from "next/navigation";

import { FeaturedMedia } from "@/components/media/featured-media";
import { LatestMedia } from "@/components/media/latest-media";
import { Multimedia } from "@/components/media/multimedia";
import { Publications } from "@/components/media/publications";
import { sanityFetch } from "@/sanity/lib/live";
import { MEDIA_PAGE_QUERY } from "@/sanity/lib/queries";
import type { MEDIA_PAGE_QUERY_RESULT } from "@/sanity.types";
import { MediaArchiveIntro } from "@/components/media/media-intro";

export default async function MediaPage() {
  const { data } = await sanityFetch({
    query: MEDIA_PAGE_QUERY,
  });

  const mediaPage = data as MEDIA_PAGE_QUERY_RESULT;

  if (!mediaPage || !mediaPage.featuredNews) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <MediaArchiveIntro
        label={mediaPage.introLabel}
        heading={mediaPage.introHeading}
        description={mediaPage.introDescription}
      />
      <FeaturedMedia story={mediaPage.featuredNews} />
      <LatestMedia
        label={mediaPage.newsSectionLabel}
        heading={mediaPage.newsSectionHeading}
        items={mediaPage.latestNews}
      />
      <Publications
        label={mediaPage.publicationsSectionLabel}
        heading={mediaPage.publicationsSectionHeading}
        items={mediaPage.latestPublications}
      />
      <Multimedia
        label={mediaPage.multimediaSectionLabel}
        heading={mediaPage.multimediaSectionHeading}
        description={mediaPage.multimediaSectionDescription}
        items={mediaPage.latestMultimedia}
      />{" "}
    </main>
  );
}
