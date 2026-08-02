import { Card, CardContent } from "@/components/ui/card";

import type { HomeSectionProps } from "./types";

export function VisionMission({ homePage }: HomeSectionProps) {
  if (!homePage.visionStatement || !homePage.missionStatement) {
    return null;
  }
  return (
    <section className="pb-10 sm:pb-12">
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-5 lg:grid-cols-2">
        <Card className="rounded-lg border-0 bg-primary text-primary-foreground shadow-lg">
          <CardContent className="p-7 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.16em] opacity-90">
              Our Vision
            </p>

            <h2 className="mt-4 text-balance text-2xl leading-tight font-bold sm:text-3xl">
              {homePage.visionStatement}
            </h2>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-0 bg-(--purple) text-white shadow-lg">
          <CardContent className="p-7 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.16em] opacity-90">
              Our Mission
            </p>

            <h2 className="mt-4 text-balance text-2xl leading-tight font-bold sm:text-3xl">
              {homePage.missionStatement}
            </h2>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
