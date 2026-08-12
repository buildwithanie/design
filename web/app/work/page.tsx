import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { WORK_PAGE_QUERY } from "@/sanity/lib/queries";
import type { WORK_PAGE_QUERY_RESULT } from "@/sanity.types";

export default async function WorkPage() {
  const { data } = await sanityFetch({
    query: WORK_PAGE_QUERY,
  });

  const workPage = data as WORK_PAGE_QUERY_RESULT;

  if (!workPage?.introLabel || !workPage.introHeading) {
    notFound();
  }

  const workAreas = (workPage.workAreas ?? []).flatMap((area) => {
    if (!area?._id || !area.title || !area.description || !area.image?.asset) {
      return [];
    }

    return [
      {
        ...area,
        title: area.title,
        description: area.description,
        image: {
          ...area.image,
          asset: area.image.asset,
        },
      },
    ];
  });

  const [primaryArea, ...supportingAreas] = workAreas;

  if (!primaryArea) {
    notFound();
  }

  const impactMetrics = (workPage.impactMetrics ?? []).flatMap((metric) => {
    if (!metric?._key || !metric.value || !metric.label) {
      return [];
    }

    return [
      {
        _key: metric._key,
        value: metric.value,
        label: metric.label,
      },
    ];
  });

  const project = workPage.featuredProject;
  const featuredProject =
    project?._id &&
    project.title &&
    project.slug &&
    project.summary &&
    project.coverImage?.asset
      ? {
          ...project,
          title: project.title,
          slug: project.slug,
          summary: project.summary,
          coverImage: {
            ...project.coverImage,
            asset: project.coverImage.asset,
          },
        }
      : null;

  const primaryImageUrl = urlForImage(primaryArea.image)
    .width(1920)
    .height(1120)
    .fit("crop")
    .auto("format")
    .url();

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
                className="size-2.5 rounded-full bg-(--green)"
                aria-hidden="true"
              />
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
                {workPage.introLabel}
              </p>
            </div>

            <span
              className="mt-7 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
              aria-hidden="true"
            />

            <h1 className="mt-7 max-w-3xl text-balance text-4xl leading-[1.04] font-bold sm:text-5xl lg:text-[3.6rem]">
              {workPage.introHeading}
            </h1>
          </div>
        </div>
      </section>

      <section className="relative isolate flex min-h-120 items-end overflow-hidden bg-(--charcoal) text-white sm:min-h-135 lg:min-h-150">
        <Image
          src={primaryImageUrl}
          alt={primaryArea.image.decorative ? "" : (primaryArea.image.alt ?? "")}
          fill
          sizes="100vw"
          placeholder={primaryArea.image.lqip ? "blur" : "empty"}
          blurDataURL={primaryArea.image.lqip ?? undefined}
          className="-z-20 object-cover object-center"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(29,29,31,0.9)_0%,rgba(29,29,31,0.58)_42%,rgba(29,29,31,0.08)_76%),linear-gradient(0deg,rgba(29,29,31,0.58)_0%,transparent_48%)]"
          aria-hidden="true"
        />

        <div className="mx-auto w-[min(1180px,92vw)] py-10 sm:py-14 lg:py-16">
          <div className="max-w-xl">
            <h2 className="text-balance text-4xl leading-[1.04] font-bold sm:text-5xl lg:text-[3.4rem]">
              {primaryArea.title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
              {primaryArea.description}
            </p>
          </div>
        </div>
      </section>

      {workPage.impactHeading && impactMetrics.length > 0 ? (
        <section className="mt-6 bg-secondary py-10 text-foreground sm:mt-8 sm:py-12">
          <div className="mx-auto w-[min(1040px,92vw)]">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {workPage.impactHeading}
            </h2>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-x-10">
              {impactMetrics.map((item) => (
                <div className="flex flex-col" key={item._key}>
                  <dt className="order-2 mt-3 max-w-48 text-sm leading-6 text-muted-foreground sm:text-base">
                    {item.label}
                  </dt>
                  <dd className="order-1 text-4xl leading-none font-bold text-primary tabular-nums sm:text-5xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {supportingAreas.length > 0 || featuredProject ? (
        <section className="bg-background py-12 sm:py-16 lg:py-20">
          <div className="mx-auto w-[min(1040px,92vw)]">
            {supportingAreas.map((area, index) => {
              const imageUrl = urlForImage(area.image)
                .width(960)
                .height(768)
                .fit("crop")
                .auto("format")
                .url();
              const image = (
                <div className="relative aspect-5/4 w-full max-w-[30rem] overflow-hidden lg:justify-self-end">
                  <Image
                    src={imageUrl}
                    alt={area.image.decorative ? "" : (area.image.alt ?? "")}
                    fill
                    sizes="(max-width: 1024px) 92vw, 32rem"
                    placeholder={area.image.lqip ? "blur" : "empty"}
                    blurDataURL={area.image.lqip ?? undefined}
                    className="object-cover object-center"
                  />
                </div>
              );
              const text = (
                <div>
                  <h2 className="text-balance text-3xl leading-[1.06] font-bold sm:text-4xl lg:text-[2.8rem]">
                    {area.title}
                  </h2>
                  <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                    {area.description}
                  </p>
                </div>
              );

              return (
                <article
                  className={`${index === 0 ? "" : "mt-12 sm:mt-16 lg:mt-20"} grid items-center gap-7 lg:grid-cols-2 lg:gap-14`}
                  key={area._id}
                >
                  {index % 2 === 0 ? (
                    <>
                      {text}
                      {image}
                    </>
                  ) : (
                    <>
                      {image}
                      {text}
                    </>
                  )}
                </article>
              );
            })}

            {featuredProject ? (
              <article
                className={`${supportingAreas.length > 0 ? "mt-12 sm:mt-16 lg:mt-20" : ""} grid items-center gap-7 lg:grid-cols-2 lg:gap-14`}
              >
                <div>
                  <p className="text-base font-semibold text-primary">
                    Work in practice
                  </p>
                  <h2 className="mt-3 text-balance text-3xl leading-[1.06] font-bold sm:text-4xl lg:text-[2.8rem]">
                    {featuredProject.title}
                  </h2>
                  <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                    {featuredProject.summary}
                  </p>
                  <Link
                    href={`/projects/${featuredProject.slug}`}
                    className="group mt-7 inline-flex items-center gap-2 text-base font-bold text-primary underline decoration-primary/35 underline-offset-6 transition-colors hover:decoration-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    Read the project
                    <HugeiconsIcon
                      icon={ArrowRight02Icon}
                      className="size-5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>

                <div className="relative aspect-5/4 w-full max-w-[30rem] overflow-hidden lg:justify-self-end">
                  <Image
                    src={urlForImage(featuredProject.coverImage)
                      .width(960)
                      .height(768)
                      .fit("crop")
                      .auto("format")
                      .url()}
                    alt={
                      featuredProject.coverImage.decorative
                        ? ""
                        : (featuredProject.coverImage.alt ?? "")
                    }
                    fill
                    sizes="(max-width: 1024px) 92vw, 32rem"
                    placeholder={featuredProject.coverImage.lqip ? "blur" : "empty"}
                    blurDataURL={featuredProject.coverImage.lqip ?? undefined}
                    className="object-cover object-center"
                  />
                </div>
              </article>
            ) : null}
          </div>
        </section>
      ) : null}
    </main>
  );
}
