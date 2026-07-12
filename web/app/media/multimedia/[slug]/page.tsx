import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { GalleryDetail } from "@/components/media/gallery-detail";
import { VideoDetail } from "@/components/media/video-detail";
import { buttonVariants } from "@/components/ui/button";

type MultimediaPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const multimediaItems = {
  "community-listening-in-practice": {
    type: "gallery",
    title: "Community listening in practice",
    summary:
      "A closer look at how conversations with communities shape research questions and priorities.",
    publishedAt: "June 2026",
    coverImage: "/images/work-hero-community-listening.png",
    coverImageAlt:
      "An IAHL field researcher leading a community listening session",
  },
  "why-community-intelligence-matters": {
    type: "video",
    title: "Why community intelligence matters",
    summary:
      "A conversation about how community knowledge changes the questions researchers ask and how findings are understood.",
    publishedAt: "March 2026",
    coverImage: "/images/community-intelligence-feature.png",
    coverImageAlt:
      "Visual representing community intelligence and locally informed research",
    youtubeId: "ScMzIvxBSi4",
  },
} as const;

type MultimediaSlug = keyof typeof multimediaItems;

function isMultimediaSlug(slug: string): slug is MultimediaSlug {
  return slug in multimediaItems;
}

export async function generateMetadata({
  params,
}: MultimediaPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isMultimediaSlug(slug)) {
    return {
      title: "Media item not found | IAHL",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const item = multimediaItems[slug];
  const title = `${item.title} | IAHL`;

  return {
    title,
    description: item.summary,
    openGraph: {
      title,
      description: item.summary,
      type: item.type === "video" ? "video.other" : "article",
      siteName: "Innovate AI HealthLab",
      images: [
        {
          url: item.coverImage,
          width: 1200,
          height: 630,
          alt: item.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: item.summary,
      images: [item.coverImage],
    },
  };
}

export default async function MultimediaDetailPage({
  params,
}: MultimediaPageProps) {
  const { slug } = await params;

  if (!isMultimediaSlug(slug)) {
    notFound();
  }

  const item = multimediaItems[slug];

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
                {item.type === "gallery" ? "Gallery" : "Video"}
              </span>

              <span className="text-muted-foreground/60" aria-hidden="true">
                /
              </span>

              <time className="text-muted-foreground">{item.publishedAt}</time>
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

      {item.type === "gallery" ? (
        <>
          <section className="pt-8 sm:pt-10">
            <div className="mx-auto w-[min(1180px,92vw)]">
              <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted sm:aspect-2/1 lg:aspect-5/2">
                <Image
                  src={item.coverImage}
                  alt={item.coverImageAlt}
                  fill
                  priority
                  sizes="92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          <GalleryDetail />
        </>
      ) : (
        <VideoDetail
          youtubeId={item.youtubeId}
          title={item.title}
          description="Community knowledge can reveal priorities, risks, and practical realities that are not always visible in research datasets. This conversation examines how that knowledge can become part of responsible health research."
        />
      )}
    </main>
  );
}
