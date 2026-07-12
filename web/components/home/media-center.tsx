import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

const featuredStory = {
  format: "Research insight",
  title: "Responsible AI needs more than good technology",
  description:
    "A closer look at why governance, community knowledge, and human oversight must shape AI used in health research.",
  image: "/images/iahl-media-meeting.png",
  alt: "IAHL researchers and partners discussing health research during a meeting",
  href: "/media",
};

const supportingStories = [
  {
    format: "Field story",
    title: "What community listening changes about research",
    image: "/images/community-intelligence-feature.png",
    alt: "A community-led conversation informing health research",
    href: "/media",
  },
  {
    format: "Partnership update",
    title: "Building research capacity that continues beyond one project",
    image: "/images/capacity-partnership-hands.png",
    alt: "Research partners working together during a collaborative activity",
    href: "/media",
  },
];

export function MediaCenter() {
  return (
    <section id="media" className="py-10 sm:py-14">
      <div className="mx-auto w-[min(1180px,92vw)] overflow-hidden rounded-lg bg-[#eff7f8] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="flex flex-col gap-4 border-b border-(--cyan)/20 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-(--purple)">
              Media Center
            </p>

            <h2 className="mt-3 text-balance text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
              Stories, ideas, and updates from IAHL
            </h2>
          </div>

          <Link
            href="/media"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "w-fit shrink-0 border-(--cyan)/30 bg-white/70",
            })}
          >
            Visit the Media Center
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              data-icon="inline-end"
              className="size-4"
              aria-hidden="true"
            />
          </Link>
        </div>

        <article className="mt-8 overflow-hidden rounded-lg bg-background">
          <div className="relative aspect-5/2 overflow-hidden bg-muted">
            <Image
              src={featuredStory.image}
              alt={featuredStory.alt}
              fill
              sizes="(max-width: 1280px) 92vw, 1100px"
              className="object-cover"
            />
          </div>

          <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                {featuredStory.format}
              </p>

              <h3 className="mt-3 max-w-2xl text-balance text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">
                {featuredStory.title}
              </h3>
            </div>

            <div>
              <p className="leading-7 text-muted-foreground">
                {featuredStory.description}
              </p>

              <Link
                href={featuredStory.href}
                className={buttonVariants({
                  variant: "link",
                  className: "mt-5 h-auto p-0 text-primary",
                })}
              >
                Read the story
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  data-icon="inline-end"
                  className="size-4"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {supportingStories.map((story) => (
            <article
              key={story.title}
              className="overflow-hidden rounded-lg bg-background"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 44vw"
                  className="object-cover"
                />
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-(--purple)">
                  {story.format}
                </p>

                <h3 className="mt-2 text-xl leading-snug font-bold sm:text-2xl">
                  {story.title}
                </h3>

                <Link
                  href={story.href}
                  className={buttonVariants({
                    variant: "link",
                    className: "mt-4 h-auto p-0 text-primary",
                  })}
                >
                  Read more
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    data-icon="inline-end"
                    className="size-4"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
