import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ContentPortableText } from "@/components/content/portable-text";
import { buttonVariants } from "@/components/ui/button";
import { formatMonthYear } from "@/lib/format-date";
import { urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { NEWS_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { NEWS_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data } = await sanityFetch({
    query: NEWS_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });

  const article = data as NEWS_BY_SLUG_QUERY_RESULT;

  if (!article || !article.coverImage.asset) {
    notFound();
  }

  const title = `${article.title} | Innovate AI HealthLab`;
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

    openGraph: {
      title,
      description,
      type: "article",
      siteName: "Innovate AI HealthLab",
      publishedTime: article.publishedAt,
      images: [openGraphImage],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [openGraphImage.url],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;

  const { data } = await sanityFetch({
    query: NEWS_BY_SLUG_QUERY,
    params: { slug },
  });

  const article = data as NEWS_BY_SLUG_QUERY_RESULT;

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

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article>
        <header className="border-b border-border bg-secondary pt-28 pb-10 md:pt-32 md:pb-14">
          <div className="mx-auto w-[min(1180px,92vw)]">
            <Link
              href="/media/news"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "-ml-3 text-muted-foreground",
              })}
            >
              <HugeiconsIcon
                icon={ArrowLeft02Icon}
                data-icon="inline-start"
                className="size-4"
                aria-hidden="true"
              />
              All news
            </Link>

            <div className="mx-auto mt-10 max-w-4xl">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold">
                <span className="text-primary">{article.newsType.title}</span>

                <span className="text-muted-foreground/60" aria-hidden="true">
                  /
                </span>

                <time
                  dateTime={article.publishedAt}
                  className="text-muted-foreground"
                >
                  {formatMonthYear(article.publishedAt)}
                </time>
              </div>

              <h1 className="mt-5 max-w-4xl text-balance text-4xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                {article.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                {article.summary}
              </p>
            </div>
          </div>
        </header>

        <section className="pt-8 sm:pt-10">
          <div className="mx-auto w-[min(1180px,92vw)]">
            <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted sm:aspect-2/1 lg:aspect-5/2">
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

        <section className="pt-10 pb-8 sm:pt-14 sm:pb-10">
          <div className="mx-auto w-[min(1180px,92vw)]">
            <ContentPortableText value={article.body} />
          </div>
        </section>
      </article>
    </main>
  );
}
