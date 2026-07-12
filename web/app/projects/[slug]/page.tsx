import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ProjectPortableText } from "@/components/project-portable-text";
import { buttonVariants } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { PROJECT_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

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
    ? urlForImage(project.coverImage).width(1800).height(1100).fit("crop").url()
    : null;

  const statusLabel = project.status ? statusLabels[project.status] : null;

  return (
    <main>
      <section className="border-b border-border bg-muted/30 pt-28 pb-14 md:pt-32 md:pb-20">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <Link
            href="/projects"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "mb-8 -ml-3 text-muted-foreground",
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

          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3 text-sm font-semibold">
                {project.areaOfWork?.title ? (
                  <span className="text-primary">
                    {project.areaOfWork.title}
                  </span>
                ) : null}

                {project.projectType?.title ? (
                  <>
                    <span
                      className="size-1 rounded-full bg-border"
                      aria-hidden="true"
                    />
                    <span className="text-muted-foreground">
                      {project.projectType.title}
                    </span>
                  </>
                ) : null}

                {statusLabel ? (
                  <>
                    <span
                      className="size-1 rounded-full bg-border"
                      aria-hidden="true"
                    />
                    <span className="text-muted-foreground">{statusLabel}</span>
                  </>
                ) : null}
              </div>

              <h1 className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>

              {project.summary ? (
                <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                  {project.summary}
                </p>
              ) : null}
            </div>

            {coverImageUrl ? (
              <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] bg-muted shadow-sm">
                <Image
                  src={coverImageUrl}
                  alt={project.coverImage?.alt ?? ""}
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 92vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {project.body?.length ? (
        <section className="py-16 md:py-24">
          <div className="mx-auto w-[min(1180px,92vw)]">
            <ProjectPortableText value={project.body} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
