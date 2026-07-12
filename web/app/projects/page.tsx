import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_PAGE_QUERY, PROJECTS_QUERY } from "@/sanity/lib/queries";
import {
  PROJECTS_PAGE_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
} from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Projects | Innovate AI HealthLab",
  description:
    "Explore IAHL projects connecting responsible AI, community knowledge, and research partnerships with real health priorities.",
};

const projectStyles = [
  {
    accent: "text-(--cyan)",
    surface: "bg-(--charcoal) text-white",
    imageFirst: true,
  },
  {
    accent: "text-primary",
    surface: "bg-[#f4eaf7]",
    imageFirst: false,
  },
  {
    accent: "text-(--green)",
    surface: "bg-[#eef7f2]",
    imageFirst: true,
  },
] as const;

export default async function ProjectsPage() {
  const [{ data: projectsPageData }, { data: projectsData }] =
    await Promise.all([
      sanityFetch({
        query: PROJECTS_PAGE_QUERY,
      }),

      sanityFetch({
        query: PROJECTS_QUERY,
      }),
    ]);

  const projectsPage = projectsPageData as PROJECTS_PAGE_QUERY_RESULT;

  const projects = projectsData as PROJECTS_QUERY_RESULT;

  if (!projectsPage) {
    throw new Error(
      "The Projects page document has not been published in Sanity.",
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <section className="relative isolate overflow-hidden bg-secondary pt-24">
        <div
          className="pointer-events-none absolute -right-16 top-32 -z-10 hidden size-52 rounded-full border-28 border-primary/10 lg:block"
          aria-hidden="true"
        />

        <div className="mx-auto w-[min(1180px,92vw)] py-14 sm:py-16 lg:py-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span
                className="size-2.5 rounded-full bg-(--purple)"
                aria-hidden="true"
              />

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                {projectsPage.introLabel}
              </p>
            </div>

            <span
              className="mt-7 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
              aria-hidden="true"
            />

            <h1 className="mt-7 max-w-3xl text-balance text-5xl leading-[1.02] font-bold sm:text-6xl lg:text-[4.2rem]">
              {projectsPage.introHeading}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {projectsPage.introDescription}
            </p>
          </div>
        </div>
      </section>

      <div>
        {projects.map((project, index) => {
          const style = projectStyles[index % projectStyles.length];

          const coverImageUrl = urlForImage(project.coverImage)
            .width(1536)
            .height(1024)
            .fit("crop")
            .auto("format")
            .url();

          const coverImageAlt = project.coverImage.decorative
            ? ""
            : (project.coverImage.alt ?? "");

          return (
            <section
              id={project.slug}
              className={`scroll-mt-28 overflow-hidden border-b border-border ${style.surface}`}
              key={project.slug}
            >
              <div className="mx-auto grid w-[min(1600px,100%)] lg:grid-cols-2 lg:items-stretch">
                <div
                  className={`flex items-center justify-center bg-white ${
                    style.imageFirst ? "" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={coverImageUrl}
                    alt={coverImageAlt}
                    width={1536}
                    height={1024}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full object-contain"
                  />
                </div>

                <div
                  className={`relative isolate flex items-center overflow-hidden px-[6vw] py-12 lg:px-[8vw] lg:py-14 ${
                    style.imageFirst ? "" : "lg:order-1"
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 -z-10 ${
                      style.imageFirst
                        ? "lg:left-8 lg:rounded-l-[46%]"
                        : "lg:right-8 lg:rounded-r-[46%]"
                    } ${style.surface}`}
                    aria-hidden="true"
                  />

                  <div className="max-w-xl">
                    <p
                      className={`text-sm font-bold uppercase tracking-[0.16em] ${style.accent}`}
                    >
                      {project.areaOfWork.title}
                    </p>

                    <h2 className="mt-5 text-balance text-4xl font-bold leading-tight sm:text-5xl">
                      {project.title}
                    </h2>

                    <p className="mt-5 text-pretty text-xl font-medium leading-8 opacity-80 sm:text-2xl">
                      {project.summary}
                    </p>

                    <Link
                      className={`mt-7 inline-flex items-center gap-2 font-bold transition-transform duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 ${style.accent}`}
                      href={`/projects/${project.slug}`}
                    >
                      View details
                      <HugeiconsIcon
                        icon={ArrowRight02Icon}
                        className="size-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-[#f4eaf7] py-16 sm:py-20">
        <div className="mx-auto grid w-[min(1180px,92vw)] gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
            {projectsPage.ctaLabel}
          </p>

          <div>
            <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
              {projectsPage.ctaHeading}
            </h2>

            <Link
              href="/get-involved#contact"
              className="mt-7 inline-flex items-center gap-2 font-bold text-(--purple) transition-transform duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
            >
              {projectsPage.ctaLinkLabel}
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                className="size-4"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
