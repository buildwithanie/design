import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { JsonLd } from "@/components/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";
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

async function getProject(slug: string) {
  "use cache";

  const { data } = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
    perspective: "published",
    stega: false,
  });

  return data as PROJECT_BY_SLUG_QUERY_RESULT;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = project.title;
  const socialTitle = `${project.title} | IAHL`;
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
    alternates: {
      canonical: `/projects/${slug}`,
    },

    openGraph: {
      title: socialTitle,
      description,
      url: `/projects/${slug}`,
      type: "website",
      siteName: SITE_NAME,
      locale: "en_KE",
      images: openGraphImage ? [openGraphImage] : [],
    },

    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: openGraphImage ? [openGraphImage.url] : [],
    },
  };
}

const statusLabels = {
  planned: "Planned project",
  active: "Active project",
  completed: "Completed project",
} as const;

const statusColors = {
  planned: "text-primary",
  active: "text-(--green)",
  completed: "text-(--purple)",
} as const;

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<ProjectPageFallback />}>
      <ProjectPageFromParams params={params} />
    </Suspense>
  );
}

async function ProjectPageFromParams({ params }: ProjectPageProps) {
  const { slug } = await params;

  return <CachedProjectPage slug={slug} />;
}

async function CachedProjectPage({ slug }: { slug: string }) {
  "use cache";

  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const coverImageUrl = project.coverImage
    ? urlForImage(project.coverImage).width(1800).height(900).fit("crop").url()
    : null;

  const statusLabel = project.status ? statusLabels[project.status] : null;
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    "@id": `${absoluteUrl(`/projects/${slug}`)}#project`,
    url: absoluteUrl(`/projects/${slug}`),
    name: project.title,
    description: project.summary,
    ...(coverImageUrl ? { image: coverImageUrl } : {}),
    creator: {
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
  };

  return (
    <main className="bg-background">
      <JsonLd data={projectJsonLd} />
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
            <div className="relative mt-6 aspect-4/3 overflow-hidden bg-muted sm:aspect-2/1 lg:aspect-5/2">
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
            <h1 className="text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            {project.summary ? (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                {project.summary}
              </p>
            ) : null}

            {statusLabel ? (
              <p
                className={`mt-5 text-sm font-semibold ${statusColors[project.status]}`}
              >
                {statusLabel}
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

function ProjectPageFallback() {
  return (
    <main
      className="min-h-screen bg-background pt-28"
      aria-label="Loading project"
      aria-busy="true"
    />
  );
}
