import Image from "next/image";
import Link from "next/link";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const galleryItems = [
  {
    src: "/images/work-hero-community-listening.png",
    alt: "An IAHL field researcher leading a community listening session",
    label: "Community listening",
    context: "Gallery",
    className: "sm:col-span-2 sm:row-span-2",
    sizes: "(max-width: 640px) 92vw, 58vw",
  },
  {
    src: "/images/research-governance-team.png",
    alt: "Researchers reviewing evidence during a governance meeting",
    label: "Evidence in discussion",
    context: "Gallery",
    className: "",
    sizes: "(max-width: 640px) 92vw, 29vw",
  },
  {
    src: "/images/project-training.png",
    alt: "Participants taking part in an applied research training session",
    label: "Learning together",
    context: "Gallery",
    className: "",
    sizes: "(max-width: 640px) 92vw, 29vw",
  },
  {
    src: "/images/community-partnership-conversation.png",
    alt: "A researcher speaking with a community partner",
    label: "Partnership in practice",
    context: "Gallery",
    className: "sm:col-span-2",
    sizes: "(max-width: 640px) 92vw, 58vw",
  },
];

export function Multimedia() {
  return (
    <section className="border-t border-border bg-[#f4eaf7] py-14 sm:py-20">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-(--purple)">
              Photos and video
            </p>

            <h2 className="mt-3 text-balance text-3xl leading-tight font-bold sm:text-4xl">
              IAHL’s work, seen from closer.
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Selected moments from community conversations, research,
              partnership, and learning.
            </p>
          </div>

          <Link
            href="/media/multimedia"
            className="inline-flex w-fit shrink-0 items-center gap-2 font-bold text-(--purple) transition-transform duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
          >
            View all media
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              className="size-4"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-9 grid auto-rows-60 gap-4 sm:grid-cols-4 sm:auto-rows-52 lg:auto-rows-60">
          {galleryItems.map((item) => (
            <figure
              key={item.label}
              className={`group relative overflow-hidden rounded-lg bg-muted ${item.className}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={item.sizes}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              />

              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/35 to-transparent px-5 pb-5 pt-16 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                  {item.context}
                </p>

                <figcaption className="mt-1 text-lg font-bold">
                  {item.label}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
