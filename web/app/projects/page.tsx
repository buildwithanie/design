import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { projects } from "@/data/projects";

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

export default function ProjectsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <section className="overflow-hidden pt-24">
        <div className="mx-auto grid w-[min(1600px,100%)] bg-white lg:grid-cols-[0.45fr_0.55fr] lg:items-stretch">
          <div className="relative isolate flex items-center overflow-hidden bg-secondary px-[6vw] py-14 lg:bg-transparent lg:px-[7vw] lg:py-20 lg:pr-[9vw]">
            <div
              className="pointer-events-none absolute inset-0 -z-20 bg-secondary lg:right-4 lg:rounded-r-[48%]"
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute -right-12 top-12 -z-10 hidden size-28 rounded-full border-18 border-primary/20 bg-(--green)/15 lg:block"
              aria-hidden="true"
            />

            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span
                  className="size-2.5 rounded-full bg-(--purple)"
                  aria-hidden="true"
                />

                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                  Research in action
                </p>
              </div>

              <span
                className="mt-7 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
                aria-hidden="true"
              />

              <h1 className="mt-7 text-balance text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-[4.2rem]">
                Projects built to make evidence useful.
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
                Explore IAHL projects across responsible AI, community evidence,
                and institutional research capacity.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white">
            <Image
              src="/images/work-knowledge-team.png"
              alt="IAHL researchers reviewing evidence and project priorities together"
              width={1717}
              height={916}
              preload
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>

      <div>
        {projects.map((project, index) => {
          const style = projectStyles[index % projectStyles.length];

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
                    src={project.coverImage}
                    alt={project.coverImageAlt}
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
                      {project.category}
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
                      View project details
                      <ArrowRight className="size-4" aria-hidden="true" />
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
            Shape the next project
          </p>

          <div>
            <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
              Have a health question that needs research, technology, or
              partnership?
            </h2>

            <Link
              href="/get-involved#contact"
              className="mt-7 inline-flex items-center gap-2 font-bold text-(--purple) transition-transform duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
            >
              Start a conversation
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
