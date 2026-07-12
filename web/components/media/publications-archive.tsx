import {
  ArrowDown01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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
  {
    type: "Research brief",
    title: "Using community evidence to understand access to care",
    year: "2025",
    format: "PDF",
    action: "Download",
    external: false,
  },
  {
    type: "Practice guide",
    title: "Planning meaningful community involvement in health research",
    year: "2025",
    format: "PDF",
    action: "Download",
    external: false,
  },
  {
    type: "Learning resource",
    title: "A practical introduction to responsible data use",
    year: "2024",
    format: "Online resource",
    action: "View resource",
    external: true,
  },
];

export function PublicationsArchive() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <p className="font-bold">All publications</p>

          <p className="text-sm text-muted-foreground">
            {publications.length} resources
          </p>
        </div>

        <div>
          {publications.map((publication) => (
            <article
              key={publication.title}
              className="grid gap-5 border-b border-border py-7 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-8"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                  {publication.type}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  {publication.format} · {publication.year}
                </p>
              </div>

              <h2 className="max-w-3xl text-xl leading-snug font-bold sm:text-2xl">
                {publication.title}
              </h2>

              {/*
                  This remains non-interactive while using mock data.
                  Sanity will provide either a downloadable file or external URL.
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
