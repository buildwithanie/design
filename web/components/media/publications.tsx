import Link from "next/link";
import {
  ArrowDown01Icon,
  ArrowRight02Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  getPublicationHref,
  isExternalPublication,
} from "@/lib/publication-link";
import type { MEDIA_PAGE_QUERY_RESULT } from "@/sanity.types";

type MediaPageData = NonNullable<MEDIA_PAGE_QUERY_RESULT>;
type PublicationItems = MediaPageData["latestPublications"];

type PublicationsProps = {
  label: string;
  heading: string;
  items: PublicationItems;
};

export function Publications({ label, heading, items }: PublicationsProps) {
  const validItems = items.filter((item) => getPublicationHref(item));

  if (validItems.length === 0) {
    return null;
  }

  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-(--purple)">
              {label}
            </p>

            <h2 className="mt-3 text-balance text-3xl leading-tight font-bold sm:text-4xl">
              {heading}
            </h2>
          </div>

          <Link
            href="/media/publications"
            className="inline-flex w-fit shrink-0 items-center gap-2 font-bold text-(--purple) transition-transform duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
          >
            View all publications
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              className="size-4"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-8 border-y border-border">
          {validItems.map((publication) => {
            const href = getPublicationHref(publication);

            if (!href) {
              return null;
            }

            const external = isExternalPublication(publication);

            return (
              <article
                key={publication._id}
                className="grid gap-4 border-b border-border py-6 last:border-b-0 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-7"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                    {publication.publicationType.title}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {external ? "Online resource" : "PDF"} ·{" "}
                    {publication.publishedAt.slice(0, 4)}
                  </p>
                </div>

                <h3 className="max-w-2xl text-xl leading-snug font-bold sm:text-2xl">
                  {publication.title}
                </h3>

                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="inline-flex w-fit items-center gap-2 font-bold text-(--purple) transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
                >
                  {external ? "View resource" : "Download"}

                  <HugeiconsIcon
                    icon={external ? ArrowUpRight01Icon : ArrowDown01Icon}
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
