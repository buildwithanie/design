import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import type { ProjectStatus } from "@/data/projects";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const statusLabels: Record<ProjectStatus, string> = {
  planned: "Planned",
  active: "Active",
  completed: "Completed",
};

const statusStyles: Record<ProjectStatus, string> = {
  planned: "bg-[#f4eaf7] text-(--purple)",
  active: "bg-[#e8f6fa] text-primary",
  completed: "bg-[#eef7f2] text-(--green)",
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return {
    title: `${project.title} | Innovate AI HealthLab`,
    description: project.summary,
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);

  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <section className="overflow-hidden bg-secondary pt-24">
        <div className="mx-auto w-[min(1400px,92vw)] py-12 sm:py-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-bold text-(--purple) transition-transform duration-300 hover:-translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--purple)"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All projects
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                  {project.category}
                </p>

                <span
                  className={`px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${statusStyles[project.status]}`}
                >
                  {statusLabels[project.status]}
                </span>
              </div>

              <h1 className="mt-5 text-balance text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
                {project.title}
              </h1>

              <p className="mt-7 max-w-xl text-pretty text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">
                {project.detailIntroduction}
              </p>
            </div>

            <div className="relative pb-8 lg:pb-12">
              <div
                className="absolute -bottom-2 -left-4 h-[82%] w-[92%] rounded-r-[46%] bg-[#f4eaf7]"
                aria-hidden="true"
              />

              <div className="relative overflow-hidden rounded-l-[18%] rounded-r-lg bg-white">
                <Image
                  src={project.coverImage}
                  alt={project.coverImageAlt}
                  width={1536}
                  height={1024}
                  preload
                  sizes="(max-width: 1024px) 92vw, 58vw"
                  className="h-auto w-full object-contain"
                />
              </div>

              <div
                className="absolute bottom-3 right-0 h-2 w-[42%] bg-[linear-gradient(90deg,var(--purple),var(--cyan),var(--green),var(--orange))]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid w-[min(1180px,92vw)] border-y border-border sm:grid-cols-3">
          {project.facts.map((fact, index) => (
            <div
              className={`py-6 sm:px-7 ${
                index > 0
                  ? "border-t border-border sm:border-l sm:border-t-0"
                  : ""
              }`}
              key={fact.label}
            >
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                {fact.label}
              </p>

              <p className="mt-2 text-lg font-bold">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Why this matters
            </p>

            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl">
              The reason behind the project
            </h2>
          </div>

          <div className="grid gap-5">
            {project.whyItMatters.map((paragraph) => (
              <p
                className="max-w-3xl text-lg leading-8 text-muted-foreground"
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#f4eaf7] py-16 sm:py-24">
        <div className="mx-auto grid w-[min(1280px,92vw)] gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20">
          <div className="relative">
            <div
              className="absolute -bottom-5 -right-5 h-[74%] w-[80%] rounded-l-[42%] bg-white/70"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-r-[18%] bg-white">
              <Image
                src={project.gallery[0].src}
                alt={project.gallery[0].alt}
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 92vw, 54vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
              What we are doing
            </p>

            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl">
              Turning the idea into practical work
            </h2>

            <div className="mt-7 border-y border-[var(--purple)]/15">
              {project.whatWeAreDoing.map((activity, index) => (
                <div
                  className={`flex items-start gap-3 py-4 ${
                    index > 0 ? "border-t border-[var(--purple)]/15" : ""
                  }`}
                  key={activity}
                >
                  <CheckCircle2
                    className="mt-1 size-5 shrink-0 text-(--purple)"
                    aria-hidden="true"
                  />

                  <p className="leading-7">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-(--charcoal) py-16 text-white sm:py-24">
        <div className="mx-auto grid w-[min(1180px,92vw)] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--cyan)">
              {project.status === "planned"
                ? "Looking ahead"
                : project.status === "active"
                  ? "Current progress"
                  : "Project results"}
            </p>

            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl">
              {project.progress.heading}
            </h2>

            <p className="mt-5 text-lg leading-8 text-white/65">
              {project.progress.introduction}
            </p>
          </div>

          <div className="border-y border-white/15">
            {project.progress.items.map((item, index) => (
              <div
                className={`flex items-start gap-4 py-6 ${
                  index > 0 ? "border-t border-white/15" : ""
                }`}
                key={item}
              >
                <CheckCircle2
                  className="mt-1 size-5 shrink-0 text-(--cyan)"
                  aria-hidden="true"
                />

                <p className="text-lg leading-8 text-white/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid w-[min(1180px,92vw)] gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div className="relative overflow-hidden bg-secondary lg:mb-16">
            <Image
              src={project.gallery[1].src}
              alt={project.gallery[1].alt}
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 92vw, 42vw"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="bg-[#eef7f2] px-7 py-10 sm:px-10 sm:py-12">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--green)">
              Work with IAHL
            </p>

            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl">
              Could this project connect with work in your community or
              institution?
            </h2>

            <Link
              href="/get-involved#contact"
              className="mt-7 inline-flex items-center gap-2 font-bold text-(--green) transition-transform duration-300 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--green)"
            >
              Start a conversation
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#f4eaf7]">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group mx-auto grid w-[min(1400px,100%)] lg:grid-cols-[0.82fr_1.18fr] lg:items-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-(--purple)"
        >
          <div className="px-[6vw] py-14 lg:px-[8vw] lg:py-20">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
              Next project
            </p>

            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {nextProject.title}
            </h2>

            <span className="mt-7 inline-flex items-center gap-2 font-bold text-(--purple)">
              View project details
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden bg-white">
            <Image
              src={nextProject.coverImage}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.025]"
            />
          </div>
        </Link>
      </section>
    </main>
  );
}
