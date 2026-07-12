import {
  ArrowDown01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

const publications = [
  {
    type: "Research brief",
    title: "Community knowledge in responsible health research",
    year: "2026",
    format: "PDF",
    action: "Download",
    external: false,
  },
  {
    type: "Practice note",
    title: "Questions to ask before introducing AI into a health programme",
    year: "2026",
    format: "PDF",
    action: "Download",
    external: false,
  },
  {
    type: "Learning resource",
    title: "Building research partnerships that strengthen local capacity",
    year: "2025",
    format: "Online resource",
    action: "View resource",
    external: true,
  },
];

export function Publications() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-(--purple)">
              Publications and resources
            </p>

            <h2 className="mt-3 text-balance text-3xl leading-tight font-bold sm:text-4xl">
              Reports, briefs, and practical resources.
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
          {publications.map((publication) => (
            <article
              key={publication.title}
              className="grid gap-4 border-b border-border py-6 last:border-b-0 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-7"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                  {publication.type}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {publication.format} · {publication.year}
                </p>
              </div>

              <h3 className="max-w-2xl text-xl leading-snug font-bold sm:text-2xl">
                {publication.title}
              </h3>

              {/*
                  This is intentionally not a link during the mock-data stage.
                  When Sanity provides a file or URL, replace this span with Link.
                */}
              <span className="inline-flex w-fit items-center gap-2 font-bold text-(--purple)">
                {publication.action}

                <HugeiconsIcon
                  icon={
                    publication.external ? ArrowUpRight01Icon : ArrowDown01Icon
                  }
                  className="size-4"
                  aria-hidden="true"
                />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
