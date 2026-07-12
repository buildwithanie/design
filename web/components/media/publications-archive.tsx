import Link from "next/link";
import {
  ArrowDown01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  getPublicationHref,
  isExternalPublication,
} from "@/lib/publication-link";
import type { PUBLICATIONS_QUERY_RESULT } from "@/sanity.types";

type PublicationsArchiveProps = {
  items: PUBLICATIONS_QUERY_RESULT;
};

export function PublicationsArchive({ items }: PublicationsArchiveProps) {
  const validItems = items.filter((item) => getPublicationHref(item));

  if (validItems.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <p className="font-bold">All publications</p>

          <p className="text-sm text-muted-foreground">
            {validItems.length}{" "}
            {validItems.length === 1 ? "resource" : "resources"}
          </p>
        </div>

        <div>
          {validItems.map((publication) => {
            const href = getPublicationHref(publication);

            if (!href) {
              return null;
            }

            const external = isExternalPublication(publication);

            return (
              <article
                key={publication._id}
                className="grid gap-5 border-b border-border py-7 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-8"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                    {publication.publicationType.title}
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {external ? "Online resource" : "PDF"} ·{" "}
                    {publication.publishedAt.slice(0, 4)}
                  </p>
                </div>

                <h2 className="max-w-3xl text-xl leading-snug font-bold sm:text-2xl">
                  {publication.title}
                </h2>

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
