import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image";

import type { HomeSectionProps } from "./types";

export function HomeHero({ homePage }: HomeSectionProps) {
  const heroImageUrl = urlForImage(homePage.heroImage)
    .width(1619)
    .height(972)
    .fit("crop")
    .auto("format")
    .url();

  const heroImageAlt = homePage.heroImage.decorative
    ? ""
    : (homePage.heroImage.alt ?? "");

  return (
    <section
      id="home"
      className="relative grid min-h-screen items-center overflow-hidden pt-10 lg:grid-cols-[0.92fr_1.08fr]"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(54,172,208,0.1),transparent_28rem),radial-gradient(circle_at_88%_18%,rgba(242,102,34,0.08),transparent_30rem),linear-gradient(135deg,#fffdf8_0%,#ffffff_58%,#fff8f0_100%)]" />

      <div className="mx-auto w-[min(92vw,1180px)] py-16 lg:col-span-2 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-8 lg:py-20">
        <p className="mb-8 text-center text-sm font-bold uppercase tracking-[0.18em] text-primary lg:col-span-2 lg:mb-0">
          Innovate AI HealthLab
        </p>

        <div className="max-w-2xl">
          <h1 className="text-balance text-4xl leading-[1.02] font-bold text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            {homePage.heroHeadline}{" "}
            <span className="text-(--purple)">
              {homePage.heroHighlightedText}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            {homePage.heroDescription}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/work"
              className={buttonVariants({
                size: "lg",
                className: "h-12 rounded-md px-6",
              })}
            >
              Explore our work
            </Link>

            <Link
              href="/get-involved#partner"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "h-12 rounded-md px-6",
              })}
            >
              Partner With Us
            </Link>
          </div>
        </div>

        <div className="mt-12 lg:-mr-4 lg:mt-0 xl:-mr-8">
          <div className="relative overflow-visible rounded-lg">
            <div className="relative aspect-1619/972 w-full overflow-hidden rounded-lg bg-transparent shadow-2xl lg:w-[104%] xl:w-[108%]">
              <Image
                src={heroImageUrl}
                alt={heroImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 66vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
