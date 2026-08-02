import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight02Icon,
  Image01Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { stegaClean } from "@sanity/client/stega";

import { formatMonthYear } from "@/lib/format-date";
import { urlForImage } from "@/sanity/lib/image";
import type { MULTIMEDIA_QUERY_RESULT } from "@/sanity.types";

type MultimediaArchiveProps = {
  items: MULTIMEDIA_QUERY_RESULT;
};

export function MultimediaArchive({ items }: MultimediaArchiveProps) {
  const validItems = items.filter(
    (item) => item.slug && item.coverImage?.asset,
  );

  if (validItems.length === 0) {
    return null;
  }

  return (
    <section className="pb-10 sm:pb-14">
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {validItems.map((item) => {
          const imageUrl = urlForImage(item.coverImage)
            .width(900)
            .height(675)
            .fit("crop")
            .auto("format")
            .url();

          const imageAlt = item.coverImage.decorative
            ? ""
            : (item.coverImage.alt ?? "");
          const isVideo = stegaClean(item.mediaType) === "video";

          return (
            <article key={item._id}>
              <Link
                href={`/media/multimedia/${item.slug}`}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
              >
                <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    placeholder={item.coverImage.lqip ? "blur" : "empty"}
                    blurDataURL={item.coverImage.lqip ?? undefined}
                  />

                  <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-background/90 text-(--purple) backdrop-blur">
                    <HugeiconsIcon
                      icon={isVideo ? Video01Icon : Image01Icon}
                      className="size-5"
                      aria-hidden="true"
                    />
                  </span>
                </div>

                <div className="pt-4">
                  <time
                    dateTime={item.publishedAt}
                    className="text-sm text-muted-foreground"
                  >
                    {formatMonthYear(item.publishedAt)}
                  </time>

                  <h3 className="mt-2 text-2xl leading-tight font-bold transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>

                  <span className="mt-3 inline-flex items-center gap-2 font-bold text-(--purple)">
                    {isVideo ? "Watch video" : "View gallery"}

                    <HugeiconsIcon
                      icon={ArrowRight02Icon}
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
