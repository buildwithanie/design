import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_PAGE_QUERY, PROJECTS_QUERY } from "@/sanity/lib/queries";
import {
  PROJECTS_PAGE_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
} from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/image";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Projects | Innovate AI HealthLab",
  description:
    "Explore IAHL projects connecting responsible AI, community knowledge, and research partnerships with real health priorities.",
};

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

  if (!projectsPage || projects.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <section className="relative isolate overflow-hidden bg-secondary pt-24">
        <div
          className="pointer-events-none absolute -right-16 top-32 -z-10 hidden size-52 rounded-full border-28 border-primary/10 lg:block"
          aria-hidden="true"
        />

        <div className="mx-auto w-[min(1180px,92vw)] pt-10 pb-10 sm:pt-12 sm:pb-12 lg:pt-14 lg:pb-14">
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

            <h1 className="mt-7 max-w-3xl text-balance text-4xl leading-[1.04] font-bold sm:text-5xl lg:text-[3.6rem]">
              {projectsPage.introHeading}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-background pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
        <div
          className={`mx-auto grid w-[min(1040px,92vw)] gap-x-8 gap-y-10 sm:gap-y-12 lg:gap-x-9 lg:gap-y-14 ${
            projects.length === 1
              ? "max-w-2xl"
              : "md:grid-cols-2"
          }`}
        >
          {projects.map((project) => {
            const coverImageUrl = urlForImage(project.coverImage)
              .width(960)
              .height(720)
              .fit("crop")
              .auto("format")
              .url();

            const coverImageAlt = project.coverImage.decorative
              ? ""
              : (project.coverImage.alt ?? "");

            return (
              <article
                id={project.slug}
                className="scroll-mt-28"
                key={project.slug}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={`View ${project.title}`}
                  className="group relative block aspect-16/9 overflow-hidden rounded-lg bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <Image
                    src={coverImageUrl}
                    alt={coverImageAlt}
                    fill
                    sizes={
                      projects.length === 1
                        ? "(max-width: 768px) 92vw, 672px"
                        : "(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 502px"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                </Link>

                <div className="pt-4 sm:pt-5">
                  <p className="text-sm font-semibold text-primary">
                    {project.areaOfWork.title}
                  </p>

                  <h2 className="mt-2.5 text-balance text-2xl leading-[1.12] font-bold sm:text-3xl">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                      {project.title}
                    </Link>
                  </h2>

                  <p className="mt-3 max-w-[58ch] text-pretty text-base leading-7 text-muted-foreground">
                    {project.summary}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
