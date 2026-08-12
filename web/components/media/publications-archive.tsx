import Link from "next/link";
import type { StegaBranded } from "next-sanity";

import {
  getPublicationHref,
  isExternalPublication,
} from "@/lib/publication-link";
import type { PUBLICATIONS_QUERY_RESULT } from "@/sanity.types";

type PublicationsArchiveProps = {
  items:
    | PUBLICATIONS_QUERY_RESULT
    | StegaBranded<PUBLICATIONS_QUERY_RESULT>;
};

export function PublicationsArchive({ items }: PublicationsArchiveProps) {
  const validItems = items.filter((item) => getPublicationHref(item));

  if (validItems.length === 0) {
    return null;
  }

  return (
    <section className="pb-10 sm:pb-14">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="grid gap-x-12 lg:grid-cols-2">
          {validItems.map((publication) => {
            const href = getPublicationHref(publication);

            if (!href) {
              return null;
            }

            const external = isExternalPublication(publication);

            return (
              <article
                key={publication._id}
                className="border-b border-border py-7"
              >
                <h2 className="max-w-xl text-xl leading-snug font-bold sm:text-2xl">
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    {publication.title}
                  </Link>
                </h2>

                <p className="mt-3 text-sm font-semibold text-(--purple)">
                  {external
                    ? (publication.externalSource ?? "Online resource")
                    : "PDF"}{" "}
                  · {publication.publishedAt.slice(0, 4)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
