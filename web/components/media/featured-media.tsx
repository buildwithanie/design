import Image from "next/image";
import Link from "next/link";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { formatMonthYear } from "@/lib/format-date";
import { urlForImage } from "@/sanity/lib/image";
import type { MEDIA_PAGE_QUERY_RESULT } from "@/sanity.types";
import { getNewsHref, isExternalNews } from "@/lib/news-link";

type MediaPageData = NonNullable<MEDIA_PAGE_QUERY_RESULT>;
type FeaturedNews = MediaPageData["featuredNews"];

type FeaturedMediaProps = {
  story: FeaturedNews;
};

export function FeaturedMedia({ story }: FeaturedMediaProps) {
  const href = getNewsHref(story);

  if (!href || !story.coverImage?.asset) {
    return null;
  }

  const imageUrl = urlForImage(story.coverImage)
    .width(1600)
    .height(640)
    .fit("crop")
    .auto("format")
    .url();

  const imageAlt = story.coverImage.decorative
    ? ""
    : (story.coverImage.alt ?? "");

const isExternal = isExternalNews(story);

  return (
    <section className="pb-14 sm:pb-18 pt-2 sm:pt-6" >
      <div className="mx-auto w-[min(1180px,92vw)]">
        <article className="overflow-hidden rounded-lg bg-[#eff7f8]">
          <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group relative block aspect-5/2 min-h-64 overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
            aria-label={`Read ${story.title}`}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1280px) 92vw, 1180px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              placeholder={story.coverImage.lqip ? "blur" : "empty"}
              blurDataURL={story.coverImage.lqip ?? undefined}
            />
          </Link>

          <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold">
                <span className="text-primary">{story.newsType.title}</span>

                <span className="text-border" aria-hidden="true">
                  /
                </span>

                <time
                  dateTime={story.publishedAt}
                  className="text-muted-foreground"
                >
                  {formatMonthYear(story.publishedAt)}
                </time>
              </div>

              <h2 className="mt-4 max-w-3xl text-balance text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
                {story.title}
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {story.summary}
              </p>

              <Link
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="mt-6 inline-flex items-center gap-2 font-bold text-(--purple) transition-transform duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
              >
                {isExternal ? "Read the coverage" : "Read the story"}

                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  className="size-4"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
