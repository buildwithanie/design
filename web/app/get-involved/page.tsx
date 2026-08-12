import { notFound } from "next/navigation";

import { InvolvedIntro } from "@/components/get-involved/involved-intro";
import { PartnershipInquiry } from "@/components/get-involved/partnership-inquiry";
import { PartnershipPaths } from "@/components/get-involved/partnership-paths";
import { sanityFetch } from "@/sanity/lib/live";
import { GET_INVOLVED_PAGE_QUERY } from "@/sanity/lib/queries";
import type { GET_INVOLVED_PAGE_QUERY_RESULT } from "@/sanity.types";

export default async function GetInvolvedPage() {
  "use cache";

  const { data } = await sanityFetch({
    query: GET_INVOLVED_PAGE_QUERY,
    perspective: "published",
    stega: false,
  });

  const getInvolved = data as GET_INVOLVED_PAGE_QUERY_RESULT;

  if (!getInvolved.page || !getInvolved.organization) {
    notFound();
  }

  return (
    <main>
      <InvolvedIntro content={getInvolved.page} />
      <PartnershipPaths content={getInvolved.page} />
      <PartnershipInquiry
        content={getInvolved.page}
        organization={getInvolved.organization}
      />
    </main>
  );
}
