import Image from "next/image";

import type { HomeSectionProps } from "@/components/home/types";
import { urlForImage } from "@/sanity/lib/image";

const approachColors = [
  "bg-[var(--green)]",
  "bg-[var(--orange)]",
  "bg-[var(--purple)]",
  "bg-foreground",
  "bg-[var(--cyan)]",
];

const approachOffsets = [
  "lg:ml-[5%]",
  "lg:mr-[10%] lg:justify-self-end",
  "lg:ml-[14%]",
  "lg:mr-[5%] lg:justify-self-end",
  "lg:ml-[18%]",
];

function getApproachMarker(title: string) {
  const words = title.trim().split(/\s+/);

  if (words.length > 1) {
    return words
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return title.trim().slice(0, 2).toUpperCase();
}

export function ResearchApproach({ homePage }: HomeSectionProps) {
  const values = (homePage.approachValues ?? []).flatMap((value, index) => {
    if (!value.title || !value.description || !value.image?.asset) {
      return [];
    }

    return [
      {
        ...value,
        marker: getApproachMarker(value.title),
        color: approachColors[index] ?? "bg-foreground",
        offset: approachOffsets[index] ?? "",
        imageUrl: urlForImage(value.image)
          .width(600)
          .height(600)
          .fit("crop")
          .auto("format")
          .url(),
        imageAlt: value.image.decorative ? "" : (value.image.alt ?? ""),
      },
    ];
  });

  if (
    !homePage.approachLabel ||
    !homePage.approachHeading ||
    values.length !== 5
  ) {
    return null;
  }

  return (
    <section className="overflow-hidden pb-12 sm:pb-16">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
            {homePage.approachLabel}
          </p>

          <h2 className="text-balance text-4xl leading-tight font-bold sm:text-5xl">
            {homePage.approachHeading}
          </h2>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-235 gap-8 lg:gap-2">
          {values.map((value, index) => {
            const isReverse = index % 2 === 1;

            return (
              <article
                key={value._key}
                className={`relative grid min-w-0 grid-cols-[92px_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-6 lg:w-155 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-7 ${
                  isReverse ? "lg:grid-cols-[minmax(0,1fr)_200px]" : ""
                } ${value.offset}`}
              >
                <div
                  className={`relative z-10 col-start-1 row-start-1 size-23 overflow-hidden rounded-full border-[7px] border-background bg-secondary shadow-xl sm:size-33 lg:size-50 lg:border-10 ${
                    isReverse ? "lg:col-start-2" : ""
                  }`}
                >
                  <Image
                    src={value.imageUrl}
                    alt={value.imageAlt}
                    fill
                    sizes="(max-width: 640px) 92px, (max-width: 1024px) 132px, 200px"
                    className="object-cover"
                    placeholder={value.image.lqip ? "blur" : "empty"}
                    blurDataURL={value.image.lqip ?? undefined}
                  />
                </div>

                <div
                  className={`absolute top-1 left-16.5 z-20 grid size-10 place-items-center rounded-full border-[5px] border-background text-[0.64rem] font-bold text-white sm:left-25 sm:size-12 sm:text-xs lg:top-5 lg:left-40.5 lg:size-14 lg:border-8 lg:text-sm ${
                    value.color
                  } ${isReverse ? "lg:right-40.5 lg:left-auto" : ""}`}
                >
                  {value.marker}

                  <span
                    className={`absolute top-8 left-1/2 -z-10 hidden h-20 w-1 -translate-x-1/2 rounded-full lg:block ${value.color}`}
                    aria-hidden="true"
                  />
                </div>

                <div
                  className={`col-start-2 row-start-1 min-w-0 ${
                    isReverse
                      ? "lg:col-start-1 lg:justify-self-end lg:text-right"
                      : ""
                  }`}
                >
                  <h3 className="text-xl leading-snug font-bold sm:text-2xl">
                    {value.title}
                  </h3>

                  <p className="mt-2 max-w-90 wrap-break-word text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
