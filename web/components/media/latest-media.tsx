import Image from "next/image";
import Link from "next/link";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { formatMonthYear } from "@/lib/format-date";
import { getNewsHref, isExternalNews } from "@/lib/news-link";
import { urlForImage } from "@/sanity/lib/image";
import type { MEDIA_PAGE_QUERY_RESULT } from "@/sanity.types";

type MediaPageData = NonNullable<MEDIA_PAGE_QUERY_RESULT>;
type LatestNews = MediaPageData["latestNews"];

type LatestMediaProps = {
  label: string;
  heading: string;
  items: LatestNews;
};

export function LatestMedia({ label, heading, items }: LatestMediaProps) {
  const validItems = items.filter(
    (item) => getNewsHref(item) && item.coverImage?.asset,
  );

  if (validItems.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-(--cyan)/20 bg-[#f7fbfb] py-14 sm:py-18">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="flex flex-col gap-5 border-b border-(--cyan)/20 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-(--purple)">
              {label}
            </p>

            <h2 className="mt-3 text-balance text-3xl leading-tight font-bold sm:text-4xl">
              {heading}
            </h2>
          </div>

          <Link
            href="/media/news"
            className="inline-flex w-fit shrink-0 items-center gap-2 font-bold text-(--purple) transition-transform duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
          >
            View all news
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              className="size-4"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="divide-y divide-(--cyan)/20">
          {validItems.map((item) => {
            const href = getNewsHref(item);

            if (!href || !item.coverImage.asset) {
              return null;
            }

            const external = isExternalNews(item);

            const imageUrl = urlForImage(item.coverImage)
              .width(720)
              .height(540)
              .fit("crop")
              .auto("format")
              .url();

            const imageAlt = item.coverImage.decorative
              ? ""
              : (item.coverImage.alt ?? "");

            return (
              <article
                key={item._id}
                className="grid gap-6 py-8 md:grid-cols-[15rem_1fr_auto] md:items-center md:gap-9"
              >
                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group relative aspect-4/3 overflow-hidden rounded-lg bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
                  aria-label={`Read ${item.title}`}
                >
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 768px) 92vw, 240px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    placeholder={item.coverImage.lqip ? "blur" : "empty"}
                    blurDataURL={item.coverImage.lqip ?? undefined}
                  />
                </Link>

                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.12em]">
                    <span className="text-primary">{item.newsType.title}</span>

                    <span className="text-border" aria-hidden="true">
                      /
                    </span>

                    <time
                      dateTime={item.publishedAt}
                      className="text-muted-foreground"
                    >
                      {formatMonthYear(item.publishedAt)}
                    </time>
                  </div>

                  <h3 className="mt-3 max-w-2xl text-2xl leading-tight font-bold sm:text-3xl">
                    <Link
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                    {item.summary}
                  </p>
                </div>

                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="inline-flex w-fit items-center gap-2 font-bold text-(--purple) transition-transform duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
                >
                  {external ? "Read coverage" : "Read story"}

                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    className="size-4"
                    aria-hidden="true"
                  />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
