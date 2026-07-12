import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { urlForImage } from "@/sanity/lib/image";

import type { HomeSectionProps } from "./types";

export function FeaturedProjects({ homePage }: HomeSectionProps) {
  const featuredProjects = (homePage.featuredProjects ?? [])
    .filter(
      (project) =>
        project?.slug &&
        project?.title &&
        project?.summary &&
        project?.coverImage?.asset &&
        project?.areaOfWork?.title,
    )
    .map((project) => ({
      ...project,
      imageUrl: urlForImage(project.coverImage)
        .width(900)
        .height(667)
        .fit("crop")
        .auto("format")
        .url(),
      imageAlt: project.coverImage.decorative
        ? ""
        : (project.coverImage.alt ?? ""),
    }));

  if (featuredProjects.length === 0) {
    return null;
  }
  const isSingleProject = featuredProjects.length === 1;
  const gridClass =
    featuredProjects.length === 1
      ? "mx-auto max-w-5xl"
      : featuredProjects.length === 2
        ? "mx-auto max-w-4xl md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <section id="work" className="py-10">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
            Featured projects
          </p>

          <h2 className="text-balance text-4xl leading-tight font-bold sm:text-5xl">
            {homePage.featuredProjectsHeading}
          </h2>

          <Link
            href="/projects"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "mt-7 h-11 rounded-md",
            })}
          >
            View all projects
          </Link>
        </div>

        <div className={`mt-10 grid gap-6 ${gridClass}`}>
          {featuredProjects.map((project) => (
            <Card
              key={project._id}
              className={`group overflow-hidden rounded-lg pt-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                isSingleProject
                  ? "gap-0 md:grid md:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)]"
                  : ""
              }`}
            >
              <div
                className={`relative bg-secondary ${
                  isSingleProject
                    ? "aspect-[1.5] md:aspect-auto md:min-h-80"
                    : "aspect-[1.35]"
                }`}
              >
                <Image
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  fill
                  sizes={
                    isSingleProject
                      ? "(max-width: 768px) 92vw, 430px"
                      : "(max-width: 900px) 92vw, 32vw"
                  }
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <CardContent
                className={`p-6 ${
                  isSingleProject
                    ? "flex flex-col justify-center text-left sm:p-8 md:p-10"
                    : "text-center"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  {project.areaOfWork.title}
                </p>
                <h3 className="mt-3 text-xl leading-snug font-bold">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {project.summary}
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className={buttonVariants({
                    variant: "link",
                    className: "mt-4 h-auto p-0 text-primary",
                  })}
                >
                  Read more
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    data-icon="inline-end"
                    className="size-4"
                    aria-hidden="true"
                  />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
