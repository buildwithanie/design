import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ContentPortableText } from "@/components/content/portable-text";
import { formatFullDate } from "@/lib/format-date";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";
import { urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { NEWS_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { NEWS_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getNewsArticle(slug: string) {
  "use cache";

  const { data } = await sanityFetch({
    query: NEWS_BY_SLUG_QUERY,
    params: { slug },
    perspective: "published",
    stega: false,
  });

  return data as NEWS_BY_SLUG_QUERY_RESULT;
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = await getNewsArticle(slug);

  if (!article || !article.coverImage.asset) {
    notFound();
  }

  const title = article.title;
  const socialTitle = `${article.title} | IAHL`;
  const description = article.summary;

  const openGraphImage = {
    url: urlForImage(article.coverImage)
      .width(1200)
      .height(630)
      .fit("crop")
      .auto("format")
      .url(),
    width: 1200,
    height: 630,
    alt: article.coverImage.alt ?? article.title,
  };

  return {
    title,
    description,
    alternates: {
      canonical: `/media/news/${slug}`,
    },

    openGraph: {
      title: socialTitle,
      description,
      url: `/media/news/${slug}`,
      type: "article",
      siteName: SITE_NAME,
      locale: "en_KE",
      publishedTime: article.publishedAt,
      images: [openGraphImage],
    },

    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [openGraphImage.url],
    },
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  return (
    <Suspense fallback={<NewsDetailPageFallback />}>
      <NewsDetailPageFromParams params={params} />
    </Suspense>
  );
}

async function NewsDetailPageFromParams({ params }: NewsDetailPageProps) {
  const { slug } = await params;

  return <CachedNewsDetailPage slug={slug} />;
}

async function CachedNewsDetailPage({ slug }: { slug: string }) {
  "use cache";

  const article = await getNewsArticle(slug);

  if (!article || !article.coverImage.asset || !article.body?.length) {
    notFound();
  }

  const coverImageUrl = urlForImage(article.coverImage)
    .width(1800)
    .height(900)
    .fit("crop")
    .auto("format")
    .url();

  const coverImageAlt = article.coverImage.decorative
    ? ""
    : (article.coverImage.alt ?? "");
  const articleUrl = absoluteUrl(`/media/news/${slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${articleUrl}#article`,
    url: articleUrl,
    headline: article.title,
    description: article.summary,
    image: coverImageUrl,
    datePublished: article.publishedAt,
    mainEntityOfPage: articleUrl,
    author: {
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd data={articleJsonLd} />
      <article>
        <header className="bg-background pt-28 pb-6 md:pt-32 md:pb-8">
          <div className="mx-auto w-[92vw] max-w-4xl">
            <Link
              href="/media?view=news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <HugeiconsIcon
                icon={ArrowLeft02Icon}
                data-icon="inline-start"
                className="size-4"
                aria-hidden="true"
              />
              All news
            </Link>

            <div className="mt-6">
              <h1 className="max-w-4xl text-balance text-4xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                {article.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                {article.summary}
              </p>

              <div className="mt-5 text-sm text-muted-foreground">
                <time dateTime={article.publishedAt}>
                  {formatFullDate(article.publishedAt)}
                </time>
              </div>
            </div>
          </div>
        </header>

        <section>
          <div className="mx-auto w-[92vw] max-w-5xl">
            <div className="relative aspect-4/3 overflow-hidden bg-muted sm:aspect-2/1">
              <Image
                src={coverImageUrl}
                alt={coverImageAlt}
                fill
                priority
                sizes="92vw"
                className="object-cover"
                placeholder={article.coverImage.lqip ? "blur" : "empty"}
                blurDataURL={article.coverImage.lqip ?? undefined}
              />
            </div>
          </div>
        </section>

        <section className="pt-8 pb-8 sm:pt-10 sm:pb-10">
          <div className="mx-auto w-[min(1180px,92vw)]">
            <ContentPortableText value={article.body} />
          </div>
        </section>
      </article>
    </main>
  );
}

function NewsDetailPageFallback() {
  return (
    <main
      className="min-h-screen bg-background pt-28"
      aria-label="Loading news article"
      aria-busy="true"
    />
  );
}
