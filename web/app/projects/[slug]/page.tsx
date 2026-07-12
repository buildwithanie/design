import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { buttonVariants } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { PROJECT_BY_SLUG_QUERY_RESULT } from "@/sanity.types";
import { ContentPortableText } from "@/components/content/portable-text";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data } = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });

  const project = data as PROJECT_BY_SLUG_QUERY_RESULT;

  if (!project) {
    return {
      title: "Project not found | IAHL",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${project.title} | IAHL`;
  const description =
    project.summary ??
    "Explore this research project from Innovate AI HealthLab.";

  const openGraphImage = project.coverImage
    ? {
        url: urlForImage(project.coverImage)
          .width(1200)
          .height(630)
          .fit("crop")
          .url(),
        width: 1200,
        height: 630,
        alt: project.coverImage.alt ?? project.title,
      }
    : undefined;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Innovate AI HealthLab",
      images: openGraphImage ? [openGraphImage] : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: openGraphImage ? [openGraphImage.url] : [],
    },
  };
}

const statusLabels = {
  planned: "Planned",
  active: "Active",
  completed: "Completed",
} as const;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const { data } = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
  });

  const project = data as PROJECT_BY_SLUG_QUERY_RESULT;

  if (!project) {
    notFound();
  }

  const coverImageUrl = project.coverImage
    ? urlForImage(project.coverImage).width(1800).height(900).fit("crop").url()
    : null;

  const statusLabel = project.status ? statusLabels[project.status] : null;

  return (
    <main className="bg-background">
      <section className="border-b border-border bg-muted/30 pt-28 pb-10 md:pt-32 md:pb-14">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <Link
            href="/projects"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "-ml-3 text-muted-foreground",
            })}
          >
            <HugeiconsIcon
              icon={ArrowLeft02Icon}
              data-icon="inline-start"
              className="size-4"
              aria-hidden="true"
            />
            All projects
          </Link>

          {coverImageUrl ? (
            <div className="relative mt-6 aspect-4/3 overflow-hidden rounded-xl bg-muted sm:aspect-2/1 lg:aspect-5/2">
              <Image
                src={coverImageUrl}
                alt={project.coverImage?.alt ?? ""}
                fill
                priority
                sizes="92vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div
            className={
              coverImageUrl
                ? "relative z-10 mx-auto -mt-8 w-full bg-background px-4 pt-6 sm:-mt-14 sm:w-[90%] sm:px-10 sm:pt-9 lg:-mt-16 lg:max-w-225 lg:px-14 lg:pt-11"
                : "mx-auto mt-10 w-[min(900px,100%)]"
            }
          >
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-6">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold">
                {project.areaOfWork?.title ? (
                  <span className="text-primary">
                    {project.areaOfWork.title}
                  </span>
                ) : null}

                {project.areaOfWork?.title && project.projectType?.title ? (
                  <span className="text-muted-foreground/70" aria-hidden="true">
                    /
                  </span>
                ) : null}

                {project.projectType?.title ? (
                  <span className="text-muted-foreground">
                    {project.projectType.title}
                  </span>
                ) : null}
              </div>

              {statusLabel ? (
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <span
                    className="size-2 rounded-full bg-(--green)"
                    aria-hidden="true"
                  />
                  {statusLabel}
                </div>
              ) : null}
            </div>

            <h1 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            {project.summary ? (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                {project.summary}
              </p>
            ) : null}
          </div>
        </div>
      </section>
      {project.body?.length ? (
        <section className="bg-background pt-10 pb-6 md:pt-14 md:pb-8">
          <div className="mx-auto w-[min(1180px,92vw)]">
            <ContentPortableText value={project.body} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
