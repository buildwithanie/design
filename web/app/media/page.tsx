import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";

import { MediaArchiveIntro } from "@/components/media/media-intro";
import {
  isMediaView,
  getMediaHref,
  MediaNavigation,
  mediaViews,
  type MediaView,
} from "@/components/media/media-navigation";
import { MediaPagination } from "@/components/media/media-pagination";
import { MultimediaArchive } from "@/components/media/multimedia-archive";
import { NewsArchive } from "@/components/media/news-archive";
import { PublicationsArchive } from "@/components/media/publications-archive";
import { sanityFetch } from "@/sanity/lib/live";
import {
  MEDIA_PAGE_QUERY,
  MULTIMEDIA_COUNT_QUERY,
  MULTIMEDIA_QUERY,
  NEWS_COUNT_QUERY,
  NEWS_QUERY,
  PUBLICATIONS_COUNT_QUERY,
  PUBLICATIONS_QUERY,
} from "@/sanity/lib/queries";
import type {
  MEDIA_PAGE_QUERY_RESULT,
} from "@/sanity.types";

const title = "Media Center | Innovate AI HealthLab";
const description =
  "News, publications, galleries and videos from Innovate AI HealthLab.";

export const metadata: Metadata = {
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

type MediaPageProps = {
  searchParams: Promise<{
    view?: string | string[];
    page?: string | string[];
  }>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parsePage(value: string | undefined) {
  if (!value || !/^\d+$/.test(value)) {
    return 1;
  }

  const page = Number(value);

  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

async function getMediaCounts(): Promise<Record<MediaView, number>> {
  const [news, publications, galleries, videos] = await Promise.all([
    sanityFetch({ query: NEWS_COUNT_QUERY }),
    sanityFetch({ query: PUBLICATIONS_COUNT_QUERY }),
    sanityFetch({
      query: MULTIMEDIA_COUNT_QUERY,
      params: { mediaType: "gallery" },
    }),
    sanityFetch({
      query: MULTIMEDIA_COUNT_QUERY,
      params: { mediaType: "video" },
    }),
  ]);

  return {
    news: news.data as number,
    publications: publications.data as number,
    galleries: galleries.data as number,
    videos: videos.data as number,
  };
}

export default async function MediaPage({ searchParams }: MediaPageProps) {
  const query = await searchParams;
  const requestedView = firstValue(query.view);
  const requestedPage = parsePage(firstValue(query.page));

  const [{ data: pageData }, mediaCounts] = await Promise.all([
    sanityFetch({ query: MEDIA_PAGE_QUERY }),
    getMediaCounts(),
  ]);

  const mediaPage = pageData as MEDIA_PAGE_QUERY_RESULT;
  const availableViews = (Object.keys(mediaViews) as MediaView[]).filter(
    (view) => mediaCounts[view] > 0,
  );
  const firstAvailableView = availableViews[0];

  if (!mediaPage || !firstAvailableView) {
    notFound();
  }

  if (
    requestedView &&
    (!isMediaView(requestedView) || mediaCounts[requestedView] === 0)
  ) {
    redirect(getMediaHref(firstAvailableView));
  }

  const activeView =
    requestedView && isMediaView(requestedView)
      ? requestedView
      : firstAvailableView;
  const totalCount = mediaCounts[activeView];

  const pageSize = mediaViews[activeView].pageSize;
  const totalPages = Math.ceil(totalCount / pageSize);
  const currentPage = totalPages > 0
    ? Math.min(requestedPage, totalPages)
    : 1;
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  let collection: ReactNode;

  if (activeView === "news") {
    const { data } = await sanityFetch({
      query: NEWS_QUERY,
      params: { start, end },
    });

    collection = <NewsArchive items={data} />;
  } else if (activeView === "publications") {
    const { data } = await sanityFetch({
      query: PUBLICATIONS_QUERY,
      params: { start, end },
    });

    collection = <PublicationsArchive items={data} />;
  } else {
    const { data } = await sanityFetch({
      query: MULTIMEDIA_QUERY,
      params: {
        start,
        end,
        mediaType: activeView === "galleries" ? "gallery" : "video",
      },
    });

    collection = <MultimediaArchive items={data} />;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <MediaArchiveIntro
        heading={mediaPage.title}
        description={mediaPage.description}
      />
      <MediaNavigation
        activeView={activeView}
        availableViews={availableViews}
      />
      {collection}
      <MediaPagination
        currentPage={currentPage}
        totalPages={totalPages}
        view={activeView}
      />
    </main>
  );
}
