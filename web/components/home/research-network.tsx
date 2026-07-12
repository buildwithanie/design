import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { urlForImage } from "@/sanity/lib/image";

import type { HomeSectionProps } from "./types";

export function ResearchNetwork({ homePage }: HomeSectionProps) {
  const participants = homePage.researchParticipants ?? [];

  const hasValidResearchNetwork =
    homePage.researchHeading &&
    homePage.researchDescription &&
    homePage.researchMapImage?.asset &&
    participants.length === 4 &&
    participants.every(
      (participant) =>
        participant?.title &&
        participant?.description &&
        participant?.image?.asset,
    );

  if (!hasValidResearchNetwork) {
    return null;
  }
  const researchMapImageUrl = urlForImage(homePage.researchMapImage)
    .width(900)
    .height(1050)
    .fit("crop")
    .auto("format")
    .url();

  const researchNodes = homePage.researchParticipants.map((participant) => ({
    key: participant._key,
    title: participant.title,
    text: participant.description,
    image: urlForImage(participant.image)
      .width(288)
      .height(288)
      .fit("crop")
      .auto("format")
      .url(),
    alt: participant.image.decorative ? "" : (participant.image.alt ?? ""),
  }));

  return (
    <section id="about" className="overflow-hidden py-5 sm:py-10 lg:py-5">
      <div className="mx-auto w-[min(1180px,94vw)]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
            Where we begin
          </p>

          <h2 className="text-balance text-5xl leading-[1.05] font-bold sm:text-6xl">
            {homePage.researchHeading}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {homePage.researchDescription}
          </p>
        </div>

        <div className="mx-auto mt-5 max-w-6xl lg:mt-8">
          <div className="lg:hidden">
            <div className="text-center">
              <div className="mx-auto mb-3 size-11 rounded-full bg-[radial-gradient(circle_at_50%_50%,white_0_24%,transparent_25%),conic-gradient(var(--cyan),var(--green),var(--orange),var(--purple),var(--cyan))] shadow-lg" />

              <div className="mx-auto mb-2 h-0.75 w-28 rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--green),var(--orange))]" />

              <p className="text-sm font-bold uppercase text-(--purple)">
                Continental Research Network
              </p>
            </div>

            <div className="relative mx-auto mt-8 aspect-[0.86] w-[min(430px,82vw)]">
              <div
                className="absolute inset-0 bg-cover bg-center drop-shadow-2xl"
                style={{
                  backgroundImage: `linear-gradient(rgba(125,42,145,0.08), rgba(242,102,34,0.08)), url("${researchMapImageUrl}")`,
                  WebkitMask:
                    'url("/images/africa-map-mask.svg") center / contain no-repeat',
                  mask: 'url("/images/africa-map-mask.svg") center / contain no-repeat',
                }}
              />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {researchNodes.map((node) => (
                <Card key={node.key} className="rounded-lg shadow-sm">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-full border-4 border-background bg-secondary shadow-md">
                      <Image
                        src={node.image}
                        alt={node.alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold">{node.title}</h3>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {node.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-155 lg:block">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center">
              <div className="mx-auto mb-3 size-11 rounded-full bg-[radial-gradient(circle_at_50%_50%,white_0_24%,transparent_25%),conic-gradient(var(--cyan),var(--green),var(--orange),var(--purple),var(--cyan))] shadow-lg" />

              <div className="mx-auto mb-2 h-0.75 w-28 rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--green),var(--orange))]" />

              <p className="text-sm font-bold uppercase text-(--purple)">
                Continental Research Network
              </p>
            </div>

            <div className="absolute top-24 left-1/2 aspect-[0.86] w-[min(390px,34vw)] -translate-x-1/2 xl:w-[min(450px,42vw)]">
              <div
                className="absolute inset-0 bg-cover bg-center drop-shadow-2xl"
                style={{
                  backgroundImage: `linear-gradient(rgba(125,42,145,0.08), rgba(242,102,34,0.08)), url("${researchMapImageUrl}")`,
                  WebkitMask:
                    'url("/images/africa-map-mask.svg") center / contain no-repeat',
                  mask: 'url("/images/africa-map-mask.svg") center / contain no-repeat',
                }}
              />
            </div>

            <div className="absolute top-28 left-0 flex items-center gap-3 xl:gap-4">
              <Card className="max-w-40 rounded-lg bg-background/95 text-right shadow-lg xl:max-w-45">
                <CardContent className="p-4">
                  <h3 className="text-base font-bold">
                    {researchNodes[0].title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {researchNodes[0].text}
                  </p>
                </CardContent>
              </Card>

              <div className="relative size-32 overflow-hidden rounded-full border-8 border-background bg-secondary shadow-xl xl:size-36">
                <Image
                  src={researchNodes[0].image}
                  alt={researchNodes[0].alt}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute top-28 right-0 flex items-center gap-3 xl:gap-4">
              <div className="relative size-32 overflow-hidden rounded-full border-8 border-background bg-secondary shadow-xl xl:size-36">
                <Image
                  src={researchNodes[1].image}
                  alt={researchNodes[1].alt}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>

              <Card className="max-w-40 rounded-lg bg-background/95 shadow-lg xl:max-w-45">
                <CardContent className="p-4">
                  <h3 className="text-base font-bold">
                    {researchNodes[1].title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {researchNodes[1].text}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="absolute bottom-8 left-0 flex items-center gap-3 xl:gap-4">
              <Card className="max-w-40 rounded-lg bg-background/95 text-right shadow-lg xl:max-w-45">
                <CardContent className="p-4">
                  <h3 className="text-base font-bold">
                    {researchNodes[3].title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {researchNodes[3].text}
                  </p>
                </CardContent>
              </Card>

              <div className="relative size-32 overflow-hidden rounded-full border-8 border-background bg-secondary shadow-xl xl:size-36">
                <Image
                  src={researchNodes[3].image}
                  alt={researchNodes[3].alt}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute right-0 bottom-8 flex items-center gap-3 xl:gap-4">
              <div>
                <div className="mb-3 h-0.75 w-28 rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--green),var(--orange))]" />

                <div className="relative size-32 overflow-hidden rounded-full border-8 border-background bg-secondary shadow-xl xl:size-36">
                  <Image
                    src={researchNodes[2].image}
                    alt={researchNodes[2].alt}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>
              </div>

              <Card className="max-w-40 rounded-lg bg-background/95 shadow-lg xl:max-w-45">
                <CardContent className="p-4">
                  <h3 className="text-base font-bold">
                    {researchNodes[2].title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {researchNodes[2].text}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
