import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight02Icon,
  Image01Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { formatMonthYear } from "@/lib/format-date";
import { urlForImage } from "@/sanity/lib/image";
import type { MULTIMEDIA_QUERY_RESULT } from "@/sanity.types";

type MultimediaArchiveProps = {
  items: MULTIMEDIA_QUERY_RESULT;
};

function MediaTypeIcon({ type }: { type: "gallery" | "video" }) {
  return (
    <HugeiconsIcon
      icon={type === "video" ? Video01Icon : Image01Icon}
      className="size-4"
      aria-hidden="true"
    />
  );
}

function getActionLabel(type: "gallery" | "video") {
  return type === "video" ? "Watch video" : "View gallery";
}

export function MultimediaArchive({ items }: MultimediaArchiveProps) {
  const validItems = items.filter(
    (item) => item.slug && item.coverImage?.asset,
  );

  if (validItems.length === 0) {
    return null;
  }

  const [featuredItem, ...remainingItems] = validItems;

  const featuredImageUrl = urlForImage(featuredItem.coverImage)
    .width(1400)
    .height(1000)
    .fit("crop")
    .auto("format")
    .url();

  const featuredImageAlt = featuredItem.coverImage.decorative
    ? ""
    : (featuredItem.coverImage.alt ?? "");

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <article className="overflow-hidden rounded-lg bg-[#f4eaf7]">
          <Link
            href={`/media/multimedia/${featuredItem.slug}`}
            className="group grid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple) lg:grid-cols-[1.25fr_0.75fr]"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-muted sm:aspect-2/1 lg:aspect-auto lg:min-h-110">
              <Image
                src={featuredImageUrl}
                alt={featuredImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 58vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                placeholder={featuredItem.coverImage.lqip ? "blur" : "empty"}
                blurDataURL={featuredItem.coverImage.lqip ?? undefined}
              />
            </div>

            <div className="flex flex-col justify-center px-6 py-8 sm:px-9 lg:px-10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-(--purple)">
                <MediaTypeIcon type={featuredItem.mediaType} />
                {featuredItem.mediaType === "video" ? "Video" : "Gallery"}
              </div>

              <h2 className="mt-4 text-balance text-3xl leading-tight font-bold sm:text-4xl">
                {featuredItem.title}
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                {featuredItem.summary}
              </p>

              <div className="mt-7 flex items-center justify-between gap-5">
                <time
                  dateTime={featuredItem.publishedAt}
                  className="text-sm text-muted-foreground"
                >
                  {formatMonthYear(featuredItem.publishedAt)}
                </time>

                <span className="inline-flex items-center gap-2 font-bold text-(--purple)">
                  {getActionLabel(featuredItem.mediaType)}

                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    className="size-4"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </Link>
        </article>

        {remainingItems.length > 0 ? (
          <div className="mt-6 grid gap-x-6 gap-y-9 md:grid-cols-2">
            {remainingItems.map((item) => {
              const imageUrl = urlForImage(item.coverImage)
                .width(1000)
                .height(667)
                .fit("crop")
                .auto("format")
                .url();

              const imageAlt = item.coverImage.decorative
                ? ""
                : (item.coverImage.alt ?? "");

              return (
                <article key={item._id}>
                  <Link
                    href={`/media/multimedia/${item.slug}`}
                    className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
                  >
                    <div className="relative aspect-3/2 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 768px) 92vw, 45vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                        placeholder={item.coverImage.lqip ? "blur" : "empty"}
                        blurDataURL={item.coverImage.lqip ?? undefined}
                      />

                      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-2 text-xs font-bold text-(--purple) backdrop-blur">
                        <MediaTypeIcon type={item.mediaType} />
                        {item.mediaType === "video" ? "Video" : "Gallery"}
                      </span>
                    </div>

                    <div className="pt-5">
                      <time
                        dateTime={item.publishedAt}
                        className="text-sm text-muted-foreground"
                      >
                        {formatMonthYear(item.publishedAt)}
                      </time>

                      <h2 className="mt-2 text-2xl leading-tight font-bold transition-colors group-hover:text-primary sm:text-3xl">
                        {item.title}
                      </h2>

                      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                        {item.summary}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 font-bold text-(--purple)">
                        {getActionLabel(item.mediaType)}

                        <HugeiconsIcon
                          icon={ArrowRight02Icon}
                          className="size-4"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
