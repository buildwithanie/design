import Image from "next/image";
import Link from "next/link";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const featuredStory = {
  format: "Research insight",
  title: "Responsible AI needs more than good technology",
  slug: "responsible-ai-needs-more-than-good-technology",
  summary:
    "Governance, community knowledge, and human oversight must shape how artificial intelligence is introduced into health research.",
  image: "/images/iahl-media-meeting.png",
  alt: "IAHL researchers and partners discussing health research during a meeting",
  publishedAt: "July 2026",
};

export function FeaturedMedia() {
  return (
    <section className="pb-14 sm:pb-18">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <article className="overflow-hidden rounded-lg bg-[#eff7f8]">
          <Link
            href={`/media/news/${featuredStory.slug}`}
            className="group relative block aspect-5/2 min-h-64 overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
            aria-label={`Read ${featuredStory.title}`}
          >
            <Image
              src={featuredStory.image}
              alt={featuredStory.alt}
              fill
              priority
              sizes="(max-width: 1280px) 92vw, 1180px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            />
          </Link>

          <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold">
                <span className="text-primary">{featuredStory.format}</span>

                <span className="text-border" aria-hidden="true">
                  /
                </span>

                <time className="text-muted-foreground">
                  {featuredStory.publishedAt}
                </time>
              </div>

              <h2 className="mt-4 max-w-3xl text-balance text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
                {featuredStory.title}
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {featuredStory.summary}
              </p>
              <Link
                href={`/media/news/${featuredStory.slug}`}
                className="mt-6 inline-flex items-center gap-2 font-bold text-(--purple) transition-transform duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
              >
                Read the story
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
