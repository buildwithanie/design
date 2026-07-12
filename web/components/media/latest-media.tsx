import Image from "next/image";
import Link from "next/link";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const latestItems = [
  {
    format: "Field story",
    title: "What community listening changes about research",
    summary:
      "How listening before designing a study can reveal different questions, risks, and measures of success.",
    date: "June 2026",
    image: "/images/community-intelligence-feature.png",
    alt: "A community-led conversation informing health research",
  },
  {
    format: "Partnership update",
    title: "Building research capacity that continues beyond one project",
    summary:
      "A practical look at long-term research partnerships, shared methods, and locally led inquiry.",
    date: "May 2026",
    image: "/images/capacity-partnership-hands.png",
    alt: "Research partners working together during a collaborative activity",
  },
  {
    format: "Organisation update",
    title: "New conversations around evidence, ethics, and public value",
    summary:
      "IAHL brings researchers and partners together to examine how evidence is produced and used.",
    date: "April 2026",
    image: "/images/research-governance-team.png",
    alt: "Researchers reviewing evidence together around a table",
  },
];

export function LatestMedia() {
  return (
    <section className="border-y border-(--cyan)/20 bg-[#f7fbfb] py-14 sm:py-18">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="flex flex-col gap-5 border-b border-(--cyan)/20 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-(--purple)">
              Latest from IAHL
            </p>

            <h2 className="mt-3 text-balance text-3xl leading-tight font-bold sm:text-4xl">
              Updates from the work, not just announcements.
            </h2>
          </div>

          <Link
            href="/media/news"
            className="inline-flex w-fit shrink-0 items-center gap-2 font-bold text-(--purple) transition-transform duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
          >
            View all news
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              className="size-4"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="divide-y divide-(--cyan)/20">
          {latestItems.map((item) => (
            <article
              key={item.title}
              className="grid gap-6 py-8 md:grid-cols-[15rem_1fr_auto] md:items-center md:gap-9"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 240px"
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.12em]">
                  <span className="text-primary">{item.format}</span>
                  <span className="text-border" aria-hidden="true">
                    /
                  </span>
                  <time className="text-muted-foreground">{item.date}</time>
                </div>

                <h3 className="mt-3 max-w-2xl text-2xl leading-tight font-bold sm:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                  {item.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
