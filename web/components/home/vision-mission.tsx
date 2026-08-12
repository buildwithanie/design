import { MissionVision as MissionVisionCards } from "@/components/mission-vision";

import type { HomeSectionProps } from "./types";

export function VisionMission({ homePage }: HomeSectionProps) {
  if (!homePage.visionStatement || !homePage.missionStatement) {
    return null;
  }
  return (
    <section className="pb-10 sm:pb-12">
      <MissionVisionCards
        missionStatement={homePage.missionStatement}
        visionStatement={homePage.visionStatement}
      />
    </section>
  );
}
