import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArchive } from "@/components/media/news-archive";
import { sanityFetch } from "@/sanity/lib/live";
import { NEWS_PAGE_QUERY, NEWS_QUERY } from "@/sanity/lib/queries";
import type { NEWS_PAGE_QUERY_RESULT, NEWS_QUERY_RESULT } from "@/sanity.types";
import { MediaArchiveIntro } from "@/components/media/media-intro";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: NEWS_PAGE_QUERY,
    stega: false,
  });

  const newsPage = data as NEWS_PAGE_QUERY_RESULT;

  if (!newsPage) {
    notFound();
  }

  const title = `${newsPage.newsArchiveLabel} | Innovate AI HealthLab`;
  const description = newsPage.newsArchiveDescription;

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

export default async function NewsPage() {
  const [{ data: newsPageData }, { data: newsItemsData }] = await Promise.all([
    sanityFetch({
      query: NEWS_PAGE_QUERY,
    }),

    sanityFetch({
      query: NEWS_QUERY,
    }),
  ]);

  const newsPage = newsPageData as NEWS_PAGE_QUERY_RESULT;
  const newsItems = newsItemsData as NEWS_QUERY_RESULT;

  if (!newsPage || newsItems.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <MediaArchiveIntro
        label={newsPage.newsArchiveLabel}
        heading={newsPage.newsArchiveHeading}
        description={newsPage.newsArchiveDescription}
      />

      <NewsArchive items={newsItems} />
    </main>
  );
}
