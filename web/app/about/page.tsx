import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { MissionVision } from "@/components/mission-vision";
import { createPageMetadata } from "@/lib/seo";
import { urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import type { ABOUT_PAGE_QUERY_RESULT } from "@/sanity.types";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Innovate AI HealthLab, our mission, vision, team, story, and partnerships advancing responsible health research.",
  path: "/about",
});

export default async function AboutPage() {
  "use cache";

  const { data } = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
    perspective: "published",
    stega: false,
  });

  const about = data as ABOUT_PAGE_QUERY_RESULT;
  const page = about.page;

  const hasRequiredContent =
    page?.pageHeading &&
    page.identityHeading &&
    page.identityStatement &&
    page.identityDescription &&
    page.identityImage?.asset &&
    page.storyHeading &&
    page.storyStatement &&
    page.storyDescription;

  if (!page || !hasRequiredContent) {
    notFound();
  }

  const identityImageUrl = urlForImage(page.identityImage)
    .width(1000)
    .height(750)
    .fit("crop")
    .auto("format")
    .url();

  const identityImageAlt = page.identityImage.decorative
    ? ""
    : (page.identityImage.alt ?? "");

  const teamMembers =
    page.teamMembers?.filter((member) => member.photo?.asset) ?? [];
  const partners =
    page.partners?.filter((partner) => partner.logo?.asset) ?? [];

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <section className="relative isolate overflow-hidden bg-secondary pt-24">
        <div
          className="pointer-events-none absolute -right-20 top-24 -z-10 hidden size-56 rounded-full border-30 border-(--purple)/10 lg:block"
          aria-hidden="true"
        />

        <div className="mx-auto w-[min(1180px,92vw)] pt-12 pb-8 sm:pt-14 sm:pb-10 lg:pt-16 lg:pb-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span
                className="size-2.5 rounded-full bg-(--green)"
                aria-hidden="true"
              />
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
                About IAHL
              </p>
            </div>

            <span
              className="mt-6 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
              aria-hidden="true"
            />

            <h1 className="mt-6 max-w-3xl text-balance text-5xl leading-[1.03] font-bold sm:text-6xl lg:text-[4rem]">
              {page.pageHeading}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-background py-10 sm:py-12 lg:py-14">
        <div className="mx-auto grid w-[min(1080px,92vw)] gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src={identityImageUrl}
              alt={identityImageAlt}
              fill
              sizes="(max-width: 1024px) 92vw, 500px"
              className="object-cover"
              placeholder={page.identityImage.lqip ? "blur" : "empty"}
              blurDataURL={page.identityImage.lqip ?? undefined}
            />
          </div>

          <div className="max-w-xl">
            <h2 className="text-4xl leading-tight font-bold sm:text-5xl">
              {page.identityHeading}
            </h2>
            <p className="mt-6 text-xl leading-8 text-foreground">
              {page.identityStatement}
            </p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              {page.identityDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-[#f3f4f5]">
        <div className="mx-auto w-[min(860px,88vw)] py-10 text-center sm:py-12 lg:py-14">
          <h2 className="text-4xl leading-tight font-bold sm:text-5xl">
            {page.storyHeading}
          </h2>

          <div className="mt-7">
            <p className="text-balance text-2xl leading-snug font-semibold sm:text-3xl">
              {page.storyStatement}
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              {page.storyDescription}
            </p>
          </div>
        </div>
      </section>

      {about.organization?.missionStatement &&
      about.organization.visionStatement ? (
        <section className="border-b border-border bg-background py-10 sm:py-12">
          <MissionVision
            missionStatement={about.organization.missionStatement}
            visionStatement={about.organization.visionStatement}
          />
        </section>
      ) : null}

      {page.teamHeading && teamMembers.length > 0 ? (
        <section className="bg-secondary py-12 sm:py-14 lg:py-16">
          <div className="mx-auto w-[min(1180px,92vw)]">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance text-4xl leading-tight font-bold sm:text-5xl">
                {page.teamHeading}
              </h2>
            </div>

            <div className="mt-9 flex flex-wrap justify-center gap-6 lg:mt-11">
              {teamMembers.map((member) => {
                const photoUrl = urlForImage(member.photo)
                  .width(720)
                  .height(576)
                  .fit("crop")
                  .auto("format")
                  .url();
                const photoAlt = member.photo.decorative
                  ? ""
                  : (member.photo.alt ?? "");

                return (
                  <article
                    className="w-full max-w-[24rem] overflow-hidden bg-background sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                    key={member._key}
                  >
                    <div className="relative aspect-5/4 overflow-hidden bg-muted">
                      <Image
                        src={photoUrl}
                        alt={photoAlt}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 384px"
                        className="object-cover"
                        placeholder={member.photo.lqip ? "blur" : "empty"}
                        blurDataURL={member.photo.lqip ?? undefined}
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl leading-tight font-bold">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-primary">
                        {member.role}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {member.biography}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {page.partnersHeading && partners.length > 0 ? (
        <section className="border-t border-border bg-background py-12 sm:py-14 lg:py-16">
          <div className="mx-auto w-[min(1080px,92vw)]">
            <h2 className="text-center text-balance text-4xl leading-tight font-bold sm:text-5xl">
              {page.partnersHeading}
            </h2>

            <div className="mt-9 flex flex-wrap justify-center gap-x-8 gap-y-7 lg:mt-11 lg:gap-x-10">
              {partners.map((partner) => {
                const logoUrl = urlForImage(partner.logo)
                  .width(328)
                  .auto("format")
                  .url();
                const logoAlt = partner.logo.decorative
                  ? ""
                  : (partner.logo.alt ?? partner.name);
                const logo = (
                  <div className="relative h-24 w-full">
                    <Image
                      src={logoUrl}
                      alt={logoAlt}
                      fill
                      sizes="164px"
                      className="object-contain"
                      placeholder={partner.logo.lqip ? "blur" : "empty"}
                      blurDataURL={partner.logo.lqip ?? undefined}
                    />
                  </div>
                );

                return (
                  <div
                    className="grid min-h-28 w-[calc(50%-1rem)] max-w-41 place-items-center px-2 sm:w-[calc(33.333%-1.35rem)] lg:w-[calc(20%-2rem)]"
                    key={partner._key}
                  >
                    {partner.website ? (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${partner.name} website`}
                        className="block w-full transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                      >
                        {logo}
                      </a>
                    ) : (
                      logo
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
