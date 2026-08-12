import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

import type { HomeSectionProps } from "@/components/home/types";
import { buttonVariants } from "@/components/ui/button";
import { formatFullDate } from "@/lib/format-date";
import { getNewsHref, isExternalNews } from "@/lib/news-link";
import { urlForImage } from "@/sanity/lib/image";

export function MediaCenter({ homePage }: HomeSectionProps) {
  const validStories = homePage.latestNews.filter(
    (story) =>
      getNewsHref(story) &&
      story.coverImage?.asset &&
      story.summary,
  );

  const featuredStory = validStories[0];
  const supportingStories = validStories.slice(1);

  if (
    !homePage.mediaLabel ||
    !homePage.mediaHeading ||
    !featuredStory ||
    !featuredStory.coverImage?.asset ||
    !featuredStory.summary
  ) {
    return null;
  }

  const featuredHref = getNewsHref(featuredStory);

  if (!featuredHref) {
    return null;
  }

  const featuredExternal = isExternalNews(featuredStory);

  const featuredImageUrl = urlForImage(featuredStory.coverImage)
    .width(1400)
    .height(560)
    .fit("crop")
    .auto("format")
    .url();

  return (
    <section id="media" className="pb-10 sm:pb-14">
      <div className="mx-auto w-[min(1180px,92vw)] overflow-hidden rounded-lg bg-[#eff7f8] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="flex flex-col gap-4 border-b border-(--cyan)/20 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-(--purple)">
              {homePage.mediaLabel}
            </p>

            <h2 className="mt-3 text-balance text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
              {homePage.mediaHeading}
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
          <Link
            href={featuredHref}
            target={featuredExternal ? "_blank" : undefined}
            rel={featuredExternal ? "noopener noreferrer" : undefined}
            className="group relative block aspect-5/2 overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            aria-label={`Read ${featuredStory.title}`}
          >
            <Image
              src={featuredImageUrl}
              alt={
                featuredStory.coverImage.decorative
                  ? ""
                  : (featuredStory.coverImage.alt ?? "")
              }
              fill
              sizes="(max-width: 1280px) 92vw, 1100px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              placeholder={featuredStory.coverImage.lqip ? "blur" : "empty"}
              blurDataURL={featuredStory.coverImage.lqip ?? undefined}
            />
          </Link>

          <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12">
            <div>
              <time
                dateTime={featuredStory.publishedAt}
                className="text-sm text-muted-foreground"
              >
                {formatFullDate(featuredStory.publishedAt)}
              </time>

              <h3 className="mt-3 max-w-2xl text-balance text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">
                <Link
                  href={featuredHref}
                  target={featuredExternal ? "_blank" : undefined}
                  rel={featuredExternal ? "noopener noreferrer" : undefined}
                  className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  {featuredStory.title}
                </Link>
              </h3>
            </div>

            <div>
              <p className="leading-7 text-muted-foreground">
                {featuredStory.summary}
              </p>

              <Link
                href={featuredHref}
                target={featuredExternal ? "_blank" : undefined}
                rel={featuredExternal ? "noopener noreferrer" : undefined}
                className={buttonVariants({
                  variant: "link",
                  className: "mt-5 h-auto p-0 text-primary",
                })}
              >
                {featuredExternal ? "Read coverage" : "Read the story"}
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

        {supportingStories.length > 0 ? (
          <div className="mt-5 grid gap-5">
            {supportingStories.map((story) => {
              const href = getNewsHref(story);

              if (!href || !story.coverImage?.asset) {
                return null;
              }

              const external = isExternalNews(story);

              const imageUrl = urlForImage(story.coverImage)
                .width(720)
                .height(405)
                .fit("crop")
                .auto("format")
                .url();

              return (
                <article
                  key={story._id}
                  className="grid overflow-hidden rounded-lg bg-background md:grid-cols-[280px_minmax(0,1fr)]"
                >
                  <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group relative block aspect-video overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:aspect-auto md:min-h-52"
                    aria-label={`Read ${story.title}`}
                  >
                    <Image
                      src={imageUrl}
                      alt={
                        story.coverImage.decorative
                          ? ""
                          : (story.coverImage.alt ?? "")
                      }
                      fill
                      sizes="(max-width: 768px) 92vw, 280px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                      placeholder={story.coverImage.lqip ? "blur" : "empty"}
                      blurDataURL={story.coverImage.lqip ?? undefined}
                    />
                  </Link>

                  <div className="flex flex-col justify-center p-5 sm:p-6 md:px-8">
                    <time
                      dateTime={story.publishedAt}
                      className="text-sm text-muted-foreground"
                    >
                      {formatFullDate(story.publishedAt)}
                    </time>

                    <h3 className="mt-2 max-w-2xl text-xl leading-snug font-bold sm:text-2xl">
                      <Link
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      >
                        {story.title}
                      </Link>
                    </h3>

                    {story.summary ? (
                      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                        {story.summary}
                      </p>
                    ) : null}

                    <Link
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className={buttonVariants({
                        variant: "link",
                        className: "mt-4 h-auto w-fit p-0 text-primary",
                      })}
                    >
                      {external ? "Read coverage" : "Read more"}
                      <HugeiconsIcon
                        icon={ArrowRight02Icon}
                        data-icon="inline-end"
                        className="size-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
