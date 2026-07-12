import Image from "next/image";
import Link from "next/link";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { urlForImage } from "@/sanity/lib/image";
import type { MEDIA_PAGE_QUERY_RESULT } from "@/sanity.types";

type MediaPageData = NonNullable<MEDIA_PAGE_QUERY_RESULT>;
type MultimediaItems = MediaPageData["latestMultimedia"];

type MultimediaProps = {
  label: string;
  heading: string;
  description: string;
  items: MultimediaItems;
};

function getTileClass(index: number, total: number) {
  if (total === 1) {
    return "sm:col-span-4 sm:row-span-2";
  }

  if (index === 0) {
    return "sm:col-span-2 sm:row-span-2";
  }

  if (total === 2 && index === 1) {
    return "sm:col-span-2 sm:row-span-2";
  }

  if (total === 3 && index === 2) {
    return "sm:col-span-2";
  }

  if (index === 3) {
    return "sm:col-span-2";
  }

  return "";
}

export function Multimedia({
  label,
  heading,
  description,
  items,
}: MultimediaProps) {
  const validItems = items.filter(
    (item) => item.slug && item.coverImage?.asset,
  );

  if (validItems.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border bg-[#f4eaf7] py-14 sm:py-20">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-(--purple)">
              {label}
            </p>

            <h2 className="mt-3 text-balance text-3xl leading-tight font-bold sm:text-4xl">
              {heading}
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              {description}
            </p>
          </div>

          <Link
            href="/media/multimedia"
            className="inline-flex w-fit shrink-0 items-center gap-2 font-bold text-(--purple) transition-transform duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
          >
            View all media
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              className="size-4"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-9 grid auto-rows-60 gap-4 sm:grid-cols-4 sm:auto-rows-52 lg:auto-rows-60">
          {validItems.map((item, index) => {
            const imageUrl = urlForImage(item.coverImage)
              .width(index === 0 ? 1400 : 900)
              .height(index === 0 ? 900 : 675)
              .fit("crop")
              .auto("format")
              .url();

            const imageAlt = item.coverImage.decorative
              ? ""
              : (item.coverImage.alt ?? "");

            return (
              <article
                key={item._id}
                className={getTileClass(index, validItems.length)}
              >
                <Link
                  href={`/media/multimedia/${item.slug}`}
                  className="group relative block size-full overflow-hidden rounded-lg bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
                  aria-label={`View ${item.title}`}
                >
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    sizes={
                      validItems.length === 1
                        ? "92vw"
                        : index === 0
                          ? "(max-width: 640px) 92vw, 58vw"
                          : "(max-width: 640px) 92vw, 29vw"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    placeholder={item.coverImage.lqip ? "blur" : "empty"}
                    blurDataURL={item.coverImage.lqip ?? undefined}
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/35 to-transparent px-5 pb-5 pt-16 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/75">
                      {item.mediaType === "video" ? "Video" : "Gallery"}
                    </p>

                    <h3 className="mt-1 text-lg font-bold sm:text-xl">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
