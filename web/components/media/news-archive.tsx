import Image from "next/image";
import Link from "next/link";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { formatMonthYear } from "@/lib/format-date";
import { getNewsHref, isExternalNews } from "@/lib/news-link";
import { urlForImage } from "@/sanity/lib/image";
import type { NEWS_QUERY_RESULT } from "@/sanity.types";

type NewsArchiveProps = {
  items: NEWS_QUERY_RESULT;
};

export function NewsArchive({ items }: NewsArchiveProps) {
  const validItems = items.filter(
    (item) => getNewsHref(item) && item.coverImage?.asset,
  );

  if (validItems.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="border-y border-border">
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
                className="grid gap-6 border-b border-border py-7 last:border-b-0 md:grid-cols-[15rem_1fr_auto] md:items-center md:gap-9"
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

                    {external && item.externalSource ? (
                      <>
                        <span className="text-border" aria-hidden="true">
                          /
                        </span>

                        <span className="text-muted-foreground">
                          {item.externalSource}
                        </span>
                      </>
                    ) : null}
                  </div>

                  <h2 className="mt-3 max-w-3xl text-2xl leading-tight font-bold sm:text-3xl">
                    <Link
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                      {item.title}
                    </Link>
                  </h2>

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
