import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { GalleryDetail } from "@/components/media/gallery-detail";
import { VideoDetail } from "@/components/media/video-detail";
import { buttonVariants } from "@/components/ui/button";
import { formatMonthYear } from "@/lib/format-date";
import { getYouTubeVideoId } from "@/lib/youtube";
import { urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { MULTIMEDIA_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { MULTIMEDIA_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

type MultimediaDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: MultimediaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data } = await sanityFetch({
    query: MULTIMEDIA_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });

  const item = data as MULTIMEDIA_BY_SLUG_QUERY_RESULT;

  if (!item || !item.coverImage.asset) {
    notFound();
  }

  const title = `${item.title} | Innovate AI HealthLab`;
  const description = item.summary;

  const openGraphImage = {
    url: urlForImage(item.coverImage)
      .width(1200)
      .height(630)
      .fit("crop")
      .auto("format")
      .url(),
    width: 1200,
    height: 630,
    alt: item.coverImage.alt ?? item.title,
  };

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      type: item.mediaType === "video" ? "video.other" : "article",
      siteName: "Innovate AI HealthLab",
      publishedTime: item.publishedAt,
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

export default async function MultimediaDetailPage({
  params,
}: MultimediaDetailPageProps) {
  const { slug } = await params;

  const { data } = await sanityFetch({
    query: MULTIMEDIA_BY_SLUG_QUERY,
    params: { slug },
  });

  const item = data as MULTIMEDIA_BY_SLUG_QUERY_RESULT;

  if (!item || !item.coverImage.asset) {
    notFound();
  }

  const youtubeId =
    item.mediaType === "video" ? getYouTubeVideoId(item.youtubeUrl) : null;

  if (
    (item.mediaType === "video" && !youtubeId) ||
    (item.mediaType === "gallery" &&
      (!item.galleryImages || item.galleryImages.length < 2))
  ) {
    notFound();
  }

  const coverImageUrl = urlForImage(item.coverImage)
    .width(1800)
    .height(900)
    .fit("crop")
    .auto("format")
    .url();

  const coverImageAlt = item.coverImage.decorative
    ? ""
    : (item.coverImage.alt ?? "");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-secondary pt-28 pb-10 md:pt-32 md:pb-14">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <Link
            href="/media/multimedia"
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
            All photos and video
          </Link>

          <div className="mx-auto mt-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold">
              <span className="text-primary">
                {item.mediaType === "video" ? "Video" : "Gallery"}
              </span>

              <span className="text-muted-foreground/60" aria-hidden="true">
                /
              </span>

              <time
                dateTime={item.publishedAt}
                className="text-muted-foreground"
              >
                {formatMonthYear(item.publishedAt)}
              </time>
            </div>

            <h1 className="mt-5 max-w-4xl text-balance text-4xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              {item.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              {item.summary}
            </p>
          </div>
        </div>
      </header>

      {item.mediaType === "gallery" && item.galleryImages ? (
        <>
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
                  placeholder={item.coverImage.lqip ? "blur" : "empty"}
                  blurDataURL={item.coverImage.lqip ?? undefined}
                />
              </div>
            </div>
          </section>

          <GalleryDetail images={item.galleryImages} />
        </>
      ) : null}

      {item.mediaType === "video" && youtubeId ? (
        <VideoDetail
          youtubeId={youtubeId}
          title={item.title}
          description={item.summary}
        />
      ) : null}
    </main>
  );
}
