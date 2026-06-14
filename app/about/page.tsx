"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Menu,
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

const storySteps = [
  {
    title: "Listen",
    text: "Begin with the health questions people are already asking.",
    color: "bg-[var(--cyan)]",
  },
  {
    title: "Connect",
    text: "Bring community knowledge, research practice, and public systems together.",
    color: "bg-primary",
  },
  {
    title: "Build",
    text: "Develop evidence and responsible technology around real priorities.",
    color: "bg-[var(--purple)]",
  },
  {
    title: "Return",
    text: "Make knowledge understandable, useful, and available for action.",
    color: "bg-[var(--green)]",
  },
];

const participants = [
  {
    title: "Community knowledge",
    image: "/images/project-community-equity.png",
    text: "People closest to a health challenge shape the questions and meaning of the work.",
  },
  {
    title: "Scientific inquiry",
    image: "/images/image.png",
    text: "Researchers build credible evidence through careful methods, data, and responsible AI.",
  },
  {
    title: "Health practice",
    image: "/images/project-training.png",
    text: "Health teams translate knowledge into decisions, services, and stronger local systems.",
  },
  {
    title: "Shared action",
    image: "/images/iahl-media-meeting.png",
    text: "Institutions and partners create the conditions for ideas to travel further and last longer.",
  },
];

const institutionalFoundations = [
  {
    title: "Research governance",
    text: "Questions, methods, responsibilities, and review points are defined before the work moves forward.",
    link: "How decisions are guided",
    href: "/work#selection",
  },
  {
    title: "Ethics and data stewardship",
    text: "Privacy, consent, transparency, and responsible technology are treated as research requirements.",
    link: "Our research standards",
    href: "/work#responsible-ai",
  },
  {
    title: "Partnership accountability",
    text: "Collaborators work through shared objectives, clear roles, and learning that benefits every participant.",
    link: "How partnerships work",
    href: "/get-involved#partner",
  },
  {
    title: "Public value",
    text: "Evidence is designed to be understandable and useful beyond reports, publications, or technical teams.",
    link: "From evidence to action",
    href: "/work#process",
  },
];

export default function AboutPage() {
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
                    : item.label === "About"
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
        <div className="mx-auto grid w-[min(1600px,100%)] bg-white lg:min-h-162.5 lg:grid-cols-[0.43fr_0.57fr]">
          <div className="relative isolate flex min-h-140 items-center overflow-hidden bg-secondary px-[6vw] py-14 sm:min-h-150 lg:min-h-162.5 lg:bg-transparent lg:px-[7vw] lg:pr-[9vw]">
            <div
              className="pointer-events-none absolute inset-0 -z-20 bg-secondary lg:right-4 lg:rounded-r-[48%]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-10 top-14 -z-10 hidden size-28 rounded-full border-18 border-(--green)/25 bg-(--purple)/10 lg:block"
              aria-hidden="true"
            />

            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span
                  className="size-2.5 rounded-full bg-(--purple)"
                  aria-hidden="true"
                />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                  About IAHL
                </p>
              </div>
              <span
                className="mt-7 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
                aria-hidden="true"
              />
              <h1 className="mt-7 text-balance text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-[4.2rem]">
                A research lab with a public purpose.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
                IAHL exists to make health research more useful, more
                inclusive, and closer to the communities it is intended to
                serve.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white">
            <Image
              src="/images/about-hero-research.png"
              alt="African health researchers connecting laboratory science, data, community engagement, and professional learning"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 1024px) 100vw, 57vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-[4vw] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
            Why IAHL matters
          </p>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Health knowledge has greater value when people can shape it, trust
            it, and use it.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            IAHL works between the first community question and the decisions
            that follow, helping evidence move in both directions.
          </p>
        </div>
      </section>

      <section className="overflow-hidden border-y border-border bg-white">
        <div className="mx-auto grid w-[min(1600px,100%)] lg:min-h-160 lg:grid-cols-[0.44fr_0.56fr]">
          <div className="relative isolate flex min-h-140 items-center overflow-hidden bg-[#f4eaf7] px-[6vw] py-14 sm:min-h-150 lg:min-h-160 lg:bg-transparent lg:px-[7vw] lg:pr-[9vw]">
            <div
              className="pointer-events-none absolute inset-0 -z-20 bg-[#f4eaf7] lg:right-4 lg:rounded-r-[48%]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-10 bottom-16 -z-10 hidden size-32 rounded-full border-20 border-(--green)/30 bg-(--purple)/10 lg:block"
              aria-hidden="true"
            />

            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span
                  className="size-2.5 rounded-full bg-(--green)"
                  aria-hidden="true"
                />
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                  Where research connects
                </p>
              </div>
              <span
                className="mt-6 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
                aria-hidden="true"
              />
              <h2 className="mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl">
                Rooted in Africa. Open to useful exchange.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
                IAHL connects locally defined health questions with knowledge,
                methods, and learning from a wider research community, while
                keeping African priorities at the center.
              </p>

              <div className="mt-8 border-l-4 border-(--green) pl-5">
                <p className="font-bold">Africa remains the point of focus.</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  The wider map represents the global knowledge and partnership
                  environment around locally led health research.
                </p>
              </div>

              <Link
                className="mt-8 inline-flex items-center gap-2 font-bold text-primary"
                href="/get-involved#partner"
              >
                Build a research connection
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="flex min-w-0 flex-col items-center justify-center bg-white px-[4vw] py-10 lg:py-14">
            <div className="relative w-full">
              <div
                className="pointer-events-none absolute inset-x-[12%] bottom-[7%] h-12 rounded-[50%] bg-(--cyan)/10 blur-2xl"
                aria-hidden="true"
              />
              <Image
                src="/images/africa-global-map.png"
                alt="World map with Africa highlighted as the center of IAHL's research focus"
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 92vw, 56vw"
                className="relative h-auto w-full object-contain"
              />
            </div>
            <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Africa-led research in a connected world
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <div className="grid overflow-hidden border border-border lg:grid-cols-[0.82fr_1.18fr]">
            <div className="grid content-center px-7 py-12 sm:px-12 lg:px-14">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Our beginning
              </p>
              <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
                IAHL started with a practical question.
              </h2>
              <p className="mt-6 leading-8 text-muted-foreground">
                Too often, research moves slowly, speaks mainly to institutions,
                or reaches communities after the important decisions have
                already been made.
              </p>
            </div>

            <div className="grid min-h-97.5 content-between bg-primary p-8 text-primary-foreground sm:p-12 lg:p-16">
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/75">
                The question
              </span>
              <blockquote className="max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                What if useful health evidence could move at the speed of need?
              </blockquote>
              <p className="max-w-xl leading-7 text-primary-foreground/80">
                That question continues to shape how IAHL listens, researches,
                builds, and shares knowledge.
              </p>
            </div>
          </div>

          <div className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-5">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-border md:block" />
            {storySteps.map((step, index) => (
              <article className="relative" key={step.title}>
                <div
                  className={`relative z-10 grid size-10 place-items-center rounded-full text-sm font-bold text-white ${step.color}`}
                >
                  {index + 1}
                </div>
                <h3 className="mt-5 text-2xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-(--charcoal) py-16 text-white sm:py-24">
        <div className="mx-auto w-[min(1320px,94vw)]">
          <div className="mb-9 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Inside IAHL
              </p>
              <h2 className="mt-4 max-w-2xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
                A working environment built around evidence.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-white/65 lg:justify-self-end">
              Research, learning, technology, and partnership are visible parts
              of the same system rather than separate activities.
            </p>
          </div>

          <Image
            src="/images/inside-iahl.png"
            alt="Inside IAHL, showing health research focus areas, an Africa program map, evidence dashboards, and publications"
            width={1536}
            height={1024}
            sizes="(max-width: 1320px) 94vw, 1320px"
            className="h-auto w-full object-contain"
          />

          <div className="grid border-x border-b border-white/15 sm:grid-cols-3">
            {[
              ["01", "Research that can be understood"],
              ["02", "Learning that strengthens practice"],
              ["03", "Innovation that remains accountable"],
            ].map(([number, text]) => (
              <div
                className="flex items-start gap-4 border-b border-white/15 p-6 last:border-b-0 sm:border-b-0 sm:border-r last:sm:border-r-0"
                key={number}
              >
                <span className="text-sm font-bold text-primary">{number}</span>
                <p className="font-bold leading-7">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Who shapes the work
            </p>
            <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
              The strongest research table has more than one kind of expert.
            </h2>
          </div>

          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {participants.map((participant, index) => (
              <article
                className={`${index % 2 === 1 ? "sm:translate-y-12" : ""}`}
                key={participant.title}
              >
                <div className="relative aspect-[1.45] overflow-hidden">
                  <Image
                    src={participant.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 92vw, 46vw"
                    className="object-cover"
                  />
                </div>
                <div className="border-t-4 border-primary pt-5">
                  <h3 className="text-2xl font-bold">{participant.title}</h3>
                  <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                    {participant.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-[#f3f4f5] py-16 sm:py-20">
        <div className="mx-auto w-[min(1440px,92vw)]">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
            How IAHL is structured
          </p>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-14">
            <div>
              <div className="flex items-center bg-background/40">
                <Image
                  src="/images/research-governance-team.png"
                  alt="IAHL research team reviewing health evidence, governance data, and public-impact findings"
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="h-auto w-full object-contain"
                />
              </div>

              <div className="grid border-t border-border sm:grid-cols-2">
                {institutionalFoundations.slice(2).map((foundation, index) => (
                  <article
                    className={`border-b border-border py-7 sm:px-6 ${
                      index === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"
                    }`}
                    key={foundation.title}
                  >
                    <h3 className="text-xl font-bold">{foundation.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {foundation.text}
                    </p>
                    <Link
                      className="mt-5 flex items-center justify-between text-sm font-bold text-primary"
                      href={foundation.href}
                    >
                      {foundation.link}
                      <ChevronRight className="size-4" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h2 className="max-w-2xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
                Credibility is built into the way the work is organized.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                Strong health research depends on more than a promising idea.
                It needs clear decisions, responsible methods, accountable
                relationships, and a path back to public benefit.
              </p>

              <div className="mt-10 grid border-t border-border sm:grid-cols-2">
                {institutionalFoundations
                  .slice(0, 2)
                  .map((foundation, index) => (
                    <article
                      className={`border-b border-border py-7 sm:px-6 ${
                        index % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"
                      }`}
                      key={foundation.title}
                    >
                      <h3 className="text-xl font-bold">
                        {foundation.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {foundation.text}
                      </p>
                      <Link
                        className="mt-5 flex items-center justify-between text-sm font-bold text-primary"
                        href={foundation.href}
                      >
                        {foundation.link}
                        <ChevronRight className="size-4" />
                      </Link>
                    </article>
                  ))}
              </div>
            </div>
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
              <h3 className="font-bold">Connect</h3>
              <div className="mt-4 grid gap-2">
                {["Partnerships", "Careers", "Contact", "Newsletter"].map(
                  (item) => (
                    <Link
                      className="text-sm text-white/70 transition hover:text-primary"
                      href={
                        item === "Partnerships"
                          ? "/get-involved#partner"
                          : item === "Careers"
                            ? "/get-involved#careers"
                            : item === "Contact"
                              ? "/get-involved#contact"
                              : "/media#newsletter"
                      }
                      key={item}
                    >
                      {item}
                    </Link>
                  ),
                )}
              </div>
            </div>

            <form onSubmit={(event) => event.preventDefault()}>
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
