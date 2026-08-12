import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { GetInvolved } from "@/components/home/get-involved";
import { HomeHero } from "@/components/home/home-hero";
import { MediaCenter } from "@/components/home/media-center";
import { ResearchApproach } from "@/components/home/research-approach";
import { ResearchNetwork } from "@/components/home/research-network";
import { VisionMission } from "@/components/home/vision-mission";
import { createOrganizationJsonLd } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import type { HOME_PAGE_QUERY_RESULT } from "@/sanity.types";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  "use cache";

  const { data } = await sanityFetch({
    query: HOME_PAGE_QUERY,
    perspective: "published",
    stega: false,
  });

  const homePage = data as HOME_PAGE_QUERY_RESULT;

  const hasValidHero =
    homePage?.heroHeadline &&
    homePage?.heroHighlightedText &&
    homePage?.heroDescription &&
    homePage?.heroImage?.asset;

  if (!homePage || !hasValidHero) {
    notFound();
  }

  const organizationJsonLd = createOrganizationJsonLd({
    publicEmail: homePage.publicEmail,
    postalAddress: homePage.postalAddress,
    phone: homePage.phone,
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <JsonLd data={organizationJsonLd} />
      <HomeHero homePage={homePage} />
      <ResearchNetwork homePage={homePage} />
      <VisionMission homePage={homePage} />
      <FeaturedProjects homePage={homePage} />
      <MediaCenter homePage={homePage} />
      <ResearchApproach homePage={homePage} />
      <GetInvolved homePage={homePage} />
    </main>
  );
}
