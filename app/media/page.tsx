"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Menu,
  Play,
  Video,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/work" },
  { label: "Media Center", href: "/media" },
  { label: "Get Involved", href: "/get-involved" },
];

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

const coverage = [
  {
    date: "June 2026",
    title: "Designing responsible health AI around public value",
    outlet: "Research briefing",
    color: "bg-[var(--purple)]",
  },
  {
    date: "May 2026",
    title: "Why locally led evidence matters for stronger health systems",
    outlet: "Partner feature",
    color: "bg-[var(--green)]",
  },
  {
    date: "April 2026",
    title: "Community participation is a research method, not a final step",
    outlet: "Opinion",
    color: "bg-primary",
  },
  {
    date: "March 2026",
    title: "Building institutional confidence in data-informed decisions",
    outlet: "Program update",
    color: "bg-[var(--cyan)]",
  },
];

export default function MediaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex min-h-24 w-[min(1180px,92vw)] items-center justify-between gap-6">
          <Link
            className="flex shrink-0 items-center"
            href="/"
            aria-label="IAHL home"
            onClick={closeMenu}
          >
            <Image
              src="/images/iahl-logo.jpeg"
              alt="Innovate AI HealthLab logo"
              width={164}
              height={120}
              priority
              className="h-16 w-auto object-contain md:h-19"
            />
          </Link>

          <nav
            className="hidden items-center gap-2 rounded-full border border-border bg-card/80 p-2 shadow-sm lg:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item, index) => (
              <Link
                className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-accent hover:text-primary ${
                  index === navItems.length - 1
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : item.label === "Media Center"
                      ? "bg-accent text-primary"
                      : "text-muted-foreground"
                }`}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            className="size-11 rounded-full lg:hidden"
            variant="outline"
            size="icon"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        {isMenuOpen ? (
          <div className="border-t border-border bg-background lg:hidden">
            <nav className="mx-auto grid w-[min(92vw,420px)] gap-2 py-5">
              {navItems.map((item) => (
                <Link
                  className="rounded-lg px-4 py-3 text-base font-semibold text-muted-foreground transition hover:bg-accent hover:text-primary"
                  href={item.href}
                  key={item.label}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

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
        className="relative overflow-hidden border-y border-border bg-[#eff7f8] py-16 sm:py-24"
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

          <div className="mt-12 grid auto-rows-[220px] gap-4 sm:grid-cols-4">
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
        className="relative overflow-hidden bg-(--charcoal) py-16 text-white sm:py-24"
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

      <section id="coverage" className="py-16 sm:py-24">
        <div className="mx-auto w-[min(1240px,92vw)]">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Media coverage
              </p>
              <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
                IAHL in the wider conversation.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
              Briefings, commentary, and partner features about responsible
              innovation and equitable health research.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coverage.map((item, index) => (
              <article
                className={`relative min-h-82.5 overflow-hidden rounded-[1.5rem_6rem_1.5rem_1.5rem] p-7 text-white ${item.color}`}
                key={item.title}
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-14 size-44 rounded-full border-30 border-white/15"
                  aria-hidden="true"
                />
                <p className="relative text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                  {item.date}
                </p>
                <h3 className="relative mt-8 text-2xl font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="relative mt-5 text-sm font-bold uppercase tracking-[0.12em] text-white/70">
                  {item.outlet}
                </p>
                <Link
                  className="absolute bottom-7 left-7 flex items-center gap-2 text-sm font-bold"
                  href="/work"
                >
                  Read more <ArrowRight className="size-4" />
                </Link>
                <span
                  className="absolute bottom-5 right-6 text-7xl font-bold leading-none text-white/10"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-border bg-[#f4eaf7] py-14 sm:py-16">
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
            <form className="mt-7 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="you@example.com"
                className="h-12 rounded-full border-(--purple)/20 bg-white px-5"
              />
              <Button type="submit" className="h-12 rounded-full px-7">
                Sign up <CheckCircle2 className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <footer
        id="footer"
        className="border-t-4 border-primary bg-[linear-gradient(135deg,#303136_0%,#35363a_48%,#26282d_100%)] text-white"
      >
        <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Image
              src="/images/iahl-logo.jpeg"
              alt="Innovate AI HealthLab logo"
              width={176}
              height={129}
              className="h-24 w-auto rounded-md bg-white object-contain shadow-sm md:h-28"
            />
            <p className="mt-6 max-w-md leading-7 text-white/70">
              Advancing health research through AI, innovation, and strategic
              partnerships for equitable health outcomes.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-bold">Explore</h3>
              <div className="mt-4 grid gap-2">
                {navItems.slice(0, 4).map((item) => (
                  <Link
                    className="text-sm text-white/70 transition hover:text-primary"
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold">Media</h3>
              <div className="mt-4 grid gap-2">
                {[
                  ["Stories", "#stories"],
                  ["Photos", "#photos"],
                  ["Videos", "#videos"],
                  ["Coverage", "#coverage"],
                ].map(([label, href]) => (
                  <Link
                    className="text-sm text-white/70 transition hover:text-primary"
                    href={href}
                    key={label}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <form>
              <h3 className="font-bold">Stay updated</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Receive IAHL news and research updates.
              </p>
              <div className="mt-4 grid gap-2">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 border-white/20 bg-white text-foreground"
                />
                <Button type="submit" className="h-11">
                  Sign up <CheckCircle2 className="size-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </footer>
    </main>
  );
}
