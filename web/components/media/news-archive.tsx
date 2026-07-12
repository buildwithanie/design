import Image from "next/image";
import Link from "next/link";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const newsItems = [
  {
    slug: "responsible-ai-needs-more-than-good-technology",
    type: "Research insight",
    title: "Responsible AI needs more than good technology",
    summary:
      "Why governance, community knowledge, and human oversight must shape AI used in health research.",
    date: "July 2026",
    image: "/images/iahl-media-meeting.png",
    alt: "IAHL researchers and partners discussing health research",
  },
  {
    slug: "what-community-listening-changes-about-research",
    type: "Field story",
    title: "What community listening changes about research",
    summary:
      "Listening before designing a study can reveal different questions, risks, and measures of success.",
    date: "June 2026",
    image: "/images/community-intelligence-feature.png",
    alt: "A community-led conversation informing health research",
  },
  {
    slug: "building-research-capacity-beyond-one-project",
    type: "Partnership update",
    title: "Building research capacity that continues beyond one project",
    summary:
      "Practical lessons from partnerships built around shared methods, confidence, and locally led inquiry.",
    date: "May 2026",
    image: "/images/capacity-partnership-hands.png",
    alt: "Research partners working together during a collaborative activity",
  },
  {
    slug: "evidence-ethics-and-public-value",
    type: "Organisation update",
    title: "New conversations around evidence, ethics, and public value",
    summary:
      "IAHL brings researchers and partners together to examine how evidence is produced, interpreted, and used.",
    date: "April 2026",
    image: "/images/research-governance-team.png",
    alt: "Researchers reviewing evidence together around a table",
  },
  {
    slug: "research-designed-with-communities",
    type: "Research insight",
    title: "What changes when research is designed with communities",
    summary:
      "Community involvement can influence the questions researchers ask and how findings are understood.",
    date: "March 2026",
    image: "/images/community-partnership-conversation.png",
    alt: "A researcher listening to a community partner",
  },
  {
    slug: "applied-learning-in-health-research",
    type: "Field story",
    title: "Applied learning that responds to real research challenges",
    summary:
      "Inside a practical learning session shaped around the decisions research teams encounter in their work.",
    date: "February 2026",
    image: "/images/project-training.png",
    alt: "Participants taking part in an applied research training session",
  },
];

export function NewsArchive() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="border-y border-border">
          {newsItems.map((item) => (
            <article
              key={item.slug}
              className="grid gap-6 border-b border-border py-7 last:border-b-0 md:grid-cols-[15rem_1fr_auto] md:items-center md:gap-9"
            >
              <Link
                href={`/media/news/${item.slug}`}
                className="group relative aspect-4/3 overflow-hidden rounded-lg bg-muted"
                aria-label={`Read ${item.title}`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 240px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </Link>

              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.12em]">
                  <span className="text-primary">{item.type}</span>

                  <span className="text-border" aria-hidden="true">
                    /
                  </span>

                  <time className="text-muted-foreground">{item.date}</time>
                </div>

                <h2 className="mt-3 max-w-3xl text-2xl leading-tight font-bold sm:text-3xl">
                  <Link
                    href={`/media/news/${item.slug}`}
                    className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    {item.title}
                  </Link>
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                  {item.summary}
                </p>
              </div>

              <Link
                href={`/media/news/${item.slug}`}
                className="inline-flex w-fit items-center gap-2 font-bold text-(--purple) transition-transform duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
              >
                Read story
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  className="size-4"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
