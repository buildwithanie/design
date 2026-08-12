import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { stegaClean } from "@sanity/client/stega";

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

async function getMultimediaItem(slug: string) {
  "use cache";

  const { data } = await sanityFetch({
    query: MULTIMEDIA_BY_SLUG_QUERY,
    params: { slug },
    perspective: "published",
    stega: false,
  });

  return data as MULTIMEDIA_BY_SLUG_QUERY_RESULT;
}

export async function generateMetadata({
  params,
}: MultimediaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const item = await getMultimediaItem(slug);

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

export default function MultimediaDetailPage({
  params,
}: MultimediaDetailPageProps) {
  return (
    <Suspense fallback={<MultimediaDetailPageFallback />}>
      <MultimediaDetailPageFromParams params={params} />
    </Suspense>
  );
}

async function MultimediaDetailPageFromParams({
  params,
}: MultimediaDetailPageProps) {
  const { slug } = await params;

  return <CachedMultimediaDetailPage slug={slug} />;
}

async function CachedMultimediaDetailPage({ slug }: { slug: string }) {
  "use cache";

  const item = await getMultimediaItem(slug);

  if (!item || !item.coverImage.asset) {
    notFound();
  }

  const mediaType = stegaClean(item.mediaType);
  const youtubeId =
    mediaType === "video" ? getYouTubeVideoId(item.youtubeUrl) : null;

  if (
    (mediaType === "video" && !youtubeId) ||
    (mediaType === "gallery" &&
      (!item.galleryImages || item.galleryImages.length < 2))
  ) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header
        className={`border-b border-border bg-secondary pt-28 md:pt-32 ${
          mediaType === "gallery" ? "pb-8 md:pb-10" : "pb-10 md:pb-14"
        }`}
      >
        <div className="mx-auto w-[min(1180px,92vw)]">
          <Link
            href={`/media?view=${mediaType === "video" ? "videos" : "galleries"}`}
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
            {mediaType === "video" ? "All videos" : "All galleries"}
          </Link>

          <div className={`mx-auto max-w-4xl ${mediaType === "gallery" ? "mt-7" : "mt-10"}`}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold">
              <span className="text-primary">
                {mediaType === "video" ? "Video" : "Gallery"}
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

            <h1
              className={`mt-5 max-w-4xl text-balance leading-[1.02] font-semibold tracking-[-0.035em] ${
                mediaType === "gallery"
                  ? "text-4xl sm:text-5xl"
                  : "text-4xl sm:text-5xl lg:text-6xl"
              }`}
            >
              {item.title}
            </h1>

            {mediaType === "video" ? (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                {item.summary}
              </p>
            ) : null}
          </div>
        </div>
      </header>

      {mediaType === "gallery" && item.galleryImages ? (
        <GalleryDetail images={item.galleryImages} />
      ) : null}

      {mediaType === "video" && youtubeId ? (
        <VideoDetail
          youtubeId={youtubeId}
          title={item.title}
          description={item.summary}
        />
      ) : null}
    </main>
  );
}

function MultimediaDetailPageFallback() {
  return (
    <main
      className="min-h-screen bg-background pt-28"
      aria-label="Loading media"
      aria-busy="true"
    />
  );
}
