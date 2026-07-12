import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight02Icon,
  Image01Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const multimediaItems = [
  {
    slug: "community-listening-in-practice",
    type: "Gallery",
    title: "Community listening in practice",
    description:
      "A closer look at how conversations with communities shape research questions and priorities.",
    date: "June 2026",
    image: "/images/work-hero-community-listening.png",
    alt: "An IAHL field researcher leading a community listening session",
    featured: true,
  },
  {
    slug: "evidence-ethics-and-partnership",
    type: "Gallery",
    title: "Evidence, ethics, and partnership",
    description:
      "Researchers and partners examining evidence and research decisions together.",
    date: "May 2026",
    image: "/images/research-governance-team.png",
    alt: "Researchers reviewing evidence during a governance meeting",
    featured: false,
  },
  {
    slug: "learning-through-practice",
    type: "Gallery",
    title: "Learning through practice",
    description:
      "Inside an applied learning session shaped around real research challenges.",
    date: "April 2026",
    image: "/images/project-training.png",
    alt: "Participants taking part in an applied research training session",
    featured: false,
  },
  {
    slug: "why-community-intelligence-matters",
    type: "Video",
    title: "Why community intelligence matters",
    description:
      "A short conversation about how community knowledge changes health research.",
    date: "March 2026",
    image: "/images/community-intelligence-feature.png",
    alt: "Visual representing community intelligence and locally informed research",
    featured: false,
  },
  {
    slug: "partnership-in-practice",
    type: "Gallery",
    title: "Partnership in practice",
    description:
      "Moments from collaborative research, conversation, and shared learning.",
    date: "February 2026",
    image: "/images/community-partnership-conversation.png",
    alt: "A researcher listening during a conversation with a community partner",
    featured: false,
  },
];

function MediaTypeIcon({ type }: { type: string }) {
  const icon = type === "Video" ? Video01Icon : Image01Icon;

  return <HugeiconsIcon icon={icon} className="size-4" aria-hidden="true" />;
}

export function MultimediaArchive() {
  const [featuredItem, ...remainingItems] = multimediaItems;

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <article className="overflow-hidden rounded-lg bg-[#f4eaf7]">
          <Link
            href={`/media/multimedia/${featuredItem.slug}`}
            className="group grid lg:grid-cols-[1.25fr_0.75fr]"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-muted sm:aspect-2/1 lg:aspect-auto lg:min-h-110">
              <Image
                src={featuredItem.image}
                alt={featuredItem.alt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 58vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            <div className="flex flex-col justify-center px-6 py-8 sm:px-9 lg:px-10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-(--purple)">
                <MediaTypeIcon type={featuredItem.type} />
                {featuredItem.type}
              </div>

              <h2 className="mt-4 text-balance text-3xl leading-tight font-bold sm:text-4xl">
                {featuredItem.title}
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                {featuredItem.description}
              </p>

              <div className="mt-7 flex items-center justify-between gap-5">
                <time className="text-sm text-muted-foreground">
                  {featuredItem.date}
                </time>

                <span className="inline-flex items-center gap-2 font-bold text-(--purple)">
                  View Gallery
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    className="size-4"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </Link>
        </article>

        <div className="mt-6 grid gap-x-6 gap-y-9 md:grid-cols-2">
          {remainingItems.map((item) => (
            <article key={item.slug}>
              <Link
                href={`/media/multimedia/${item.slug}`}
                className="group block"
              >
                <div className="relative aspect-3/2 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 92vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />

                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-2 text-xs font-bold text-(--purple) backdrop-blur">
                    <MediaTypeIcon type={item.type} />
                    {item.type}
                  </span>
                </div>

                <div className="pt-5">
                  <time className="text-sm text-muted-foreground">
                    {item.date}
                  </time>

                  <h2 className="mt-2 text-2xl leading-tight font-bold transition-colors group-hover:text-primary sm:text-3xl">
                    {item.title}
                  </h2>

                  <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                    {item.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 font-bold text-(--purple)">
                    {item.type === "Video" ? "Watch video" : "View gallery"}

                    <HugeiconsIcon
                      icon={ArrowRight02Icon}
                      className="size-4"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
