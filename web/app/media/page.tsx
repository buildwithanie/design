import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  CheckCircle2,
  Play,
  Video,
} from "lucide-react";

import { ClientForm } from "@/components/client-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const photoGallery = [
  {
    src: "/images/work-hero-community-listening.png",
    alt: "Community listening session led by an IAHL field researcher",
    label: "Community listening",
    className: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/images/research-governance-team.png",
    alt: "Research governance team reviewing evidence together",
    label: "Research governance",
    className: "",
  },
  {
    src: "/images/project-training.png",
    alt: "Applied research training session",
    label: "Applied learning",
    className: "",
  },
  {
    src: "/images/iahl-media-meeting.png",
    alt: "IAHL team holding a collaborative meeting",
    label: "Partnership in practice",
    className: "sm:col-span-2",
  },
  {
    src: "/images/community-partnership-conversation.png",
    alt: "Researcher listening to a community partner",
    label: "Built with, not for",
    className: "sm:col-span-2",
  },
];

const videos = [
  {
    title: "Why community intelligence changes research",
    label: "Field conversations",
    image: "/images/community-intelligence-feature.png",
  },
  {
    title: "Responsible AI needs human oversight",
    label: "Research explainers",
    image: "/images/project-ai-lab.png",
  },
  {
    title: "Capacity that continues after the project",
    label: "Partner stories",
    image: "/images/capacity-partnership-hands.png",
  },
];




export default function MediaPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <section className="overflow-hidden pt-24">
        <div className="mx-auto grid w-[min(1600px,100%)] bg-white lg:min-h-162.5 lg:grid-cols-[0.45fr_0.55fr]">
          <div className="relative isolate flex min-h-140 items-center overflow-hidden bg-secondary px-[6vw] py-14 sm:min-h-150 lg:min-h-162.5 lg:bg-transparent lg:px-[7vw] lg:pr-[9vw]">
            <div
              className="pointer-events-none absolute inset-0 -z-20 bg-secondary lg:right-4 lg:rounded-r-[48%]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-12 top-12 -z-10 hidden size-28 rounded-full border-18 border-primary/20 bg-(--purple)/10 lg:block"
              aria-hidden="true"
            />

            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span
                  className="size-2.5 rounded-full bg-(--purple)"
                  aria-hidden="true"
                />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                  Media Center
                </p>
              </div>

              <span
                className="mt-7 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
                aria-hidden="true"
              />

              <h1 className="mt-7 max-w-2xl text-balance text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-[4.2rem]">
                Evidence, stories, and ideas in motion.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
                Follow IAHL research, community conversations, field learning,
                and partnerships as they move from questions into public value.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  ["Photos", "#photos"],
                  ["Videos", "#videos"],
                  ["Coverage", "#coverage"],
                ].map(([label, href]) => (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-full border-(--purple)/20 bg-white/65"
                    key={label}
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white">
            <Image
              src="/images/media-center-hero.png"
              alt="An IAHL media professional preparing research stories with a microphone and camera"
              width={1672}
              height={941}
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>

     

      <section
        id="photos"
        className="relative scroll-mt-28 overflow-hidden border-y border-border bg-[#eff7f8] py-16 sm:py-24"
      >
        <div
          className="pointer-events-none absolute -left-36 -top-44 size-107.5 rounded-full border-68 border-(--cyan)/10"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-[min(1240px,92vw)]">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <Camera className="size-7 text-(--purple)" />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
                  Photo archive
                </p>
              </div>
              <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
                The work, seen up close.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
              Moments from community inquiry, training, research governance,
              and partnership in practice.
            </p>
          </div>

          <div className="mt-12 grid auto-rows-55 gap-4 sm:grid-cols-4">
            {photoGallery.map((photo) => (
              <figure
                className={`group relative overflow-hidden rounded-[1.5rem_4rem_1.5rem_1.5rem] bg-white ${photo.className}`}
                key={photo.label}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, 46vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-5 pb-5 pt-12 text-sm font-bold text-white">
                  {photo.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        id="videos"
        className="relative scroll-mt-28 overflow-hidden bg-(--charcoal) py-16 text-white sm:py-24"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(54,172,208,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(54,172,208,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-[min(1240px,92vw)]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <Video className="size-7 text-(--cyan)" />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--cyan)">
                  Video gallery
                </p>
              </div>
              <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
                Watch the ideas take shape.
              </h2>
            </div>
            <p className="max-w-lg text-lg leading-8 text-white/60">
              Short explainers, partner conversations, and stories from the
              field.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <article className="group relative overflow-hidden rounded-[2rem_8rem_2rem_2rem] bg-black">
              <Image
                src="/images/inside-iahl.png"
                alt="Inside the IAHL research and innovation environment"
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 92vw, 60vw"
                className="h-auto w-full opacity-75 transition duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/5 to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <button
                  className="grid size-20 place-items-center rounded-full border border-white/35 bg-white/15 backdrop-blur transition hover:scale-105 hover:bg-primary"
                  type="button"
                  aria-label="Play Inside IAHL video"
                >
                  <Play className="ml-1 size-8 fill-white" />
                </button>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                  Featured video
                </p>
                <h3 className="mt-3 max-w-2xl text-3xl font-bold">
                  Inside IAHL: where evidence, ethics, and partnership meet
                </h3>
              </div>
            </article>

            <div className="grid gap-4">
              {videos.map((video) => (
                <article
                  className="grid grid-cols-[120px_1fr] overflow-hidden rounded-[1rem_3rem_1rem_1rem] border border-white/10 bg-white/5"
                  key={video.title}
                >
                  <div className="relative min-h-32 overflow-hidden">
                    <Image
                      src={video.image}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 grid place-items-center bg-black/25">
                      <span className="grid size-9 place-items-center rounded-full bg-primary">
                        <Play className="ml-0.5 size-4 fill-white" />
                      </span>
                    </div>
                  </div>
                  <div className="grid content-center p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-(--green)">
                      {video.label}
                    </p>
                    <h3 className="mt-2 font-bold leading-snug">{video.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section
        id="newsletter"
        className="scroll-mt-28 overflow-hidden border-y border-border bg-[#f4eaf7] py-14 sm:py-16"
      >
        <div className="mx-auto grid w-[min(1180px,92vw)] gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
              Stay connected
            </p>
            <span
              className="mt-5 block h-1 w-14 bg-primary"
              aria-hidden="true"
            />
          </div>
          <div>
            <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
              Receive research updates, field stories, and new media from IAHL.
            </h2>
<ClientForm
              className="mt-7 flex max-w-2xl flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="you@example.com"
                className="h-12 rounded-full border-(--purple)/20 bg-white px-5"
              />
              <Button type="submit" className="h-12 rounded-full px-7">
                Sign up <CheckCircle2 className="size-4" />
              </Button>
            </ClientForm>
          </div>
        </div>
      </section>
    </main>
  );
}
