import { InvolvedIntro } from "@/components/get-involved/involved-intro";
import { PartnershipInquiry } from "@/components/get-involved/partnership-inquiry";
import { PartnershipPaths } from "@/components/get-involved/partnership-paths";

export default function GetInvolvedPage() {
  return (
    <main>
      <InvolvedIntro />
      <PartnershipPaths />
      <PartnershipInquiry />
    </main>
  );
}
