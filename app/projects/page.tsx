"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/work" },
  { label: "Media Center", href: "/media" },
  { label: "Get Involved", href: "/get-involved" },
];

const projects = [
  {
    id: "ai-health-equity-lab",
    eyebrow: "Responsible AI and data",
    title: "AI Health Equity Lab",
    statement:
      "AI that helps research teams see inequity without hiding responsibility.",
    text: "The AI Health Equity Lab explores analytical approaches that can identify patterns earlier, strengthen public-health inquiry, and keep human judgment, transparency, and accountability visible throughout the work.",
    image: "/images/project-ai-lab.png",
    alt: "Researchers reviewing health data and analytical findings together",
    points: [
      "Interpretable tools for complex health questions",
      "Ethical data stewardship and privacy",
      "Decision support with human oversight",
    ],
    pathway: "/work#responsible-ai",
    pathwayLabel: "Explore the responsible AI pathway",
    accent: "text-[var(--cyan)]",
    surface: "bg-[var(--charcoal)] text-white",
    muted: "text-white/65",
    divider: "divide-white/15 border-white/15",
    imageFirst: true,
  },
  {
    id: "community-evidence-hubs",
    eyebrow: "Community intelligence",
    title: "Community Evidence Hubs",
    statement:
      "Evidence begins with questions a community already recognizes.",
    text: "Community Evidence Hubs bring local priorities, lived experience, field inquiry, and research practice into the same space so findings can be understood, challenged, and used by the people closest to the issue.",
    image: "/images/project-community-equity.png",
    alt: "Community members and researchers discussing local health priorities",
    points: [
      "Community-defined research priorities",
      "Mixed-method local inquiry",
      "Findings returned in useful forms",
    ],
    pathway: "/work#community-intelligence",
    pathwayLabel: "Explore the community research pathway",
    accent: "text-primary",
    surface: "bg-[#f4eaf7]",
    muted: "text-muted-foreground",
    divider: "divide-[var(--purple)]/15 border-[var(--purple)]/15",
    imageFirst: false,
  },
  {
    id: "digital-research-partnerships",
    eyebrow: "Capacity and partnership",
    title: "Digital Research Partnerships",
    statement:
      "Research capability that continues after a workshop, tool, or pilot.",
    text: "Digital Research Partnerships connect practical technology with shared methods, training, governance, and institutional collaboration so teams can carry responsible research practice forward.",
    image: "/images/project-training.png",
    alt: "Health professionals participating in an applied research learning session",
    points: [
      "Applied research learning",
      "Shared methods and governance",
      "Long-term institutional capacity",
    ],
    pathway: "/work#capacity-partnership",
    pathwayLabel: "Explore the capacity-building pathway",
    accent: "text-[var(--green)]",
    surface: "bg-[#eef7f2]",
    muted: "text-muted-foreground",
    divider: "divide-[var(--green)]/20 border-[var(--green)]/20",
    imageFirst: true,
  },
];

export default function ProjectsPage() {
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
            {navItems.map((item) => (
              <Link
                className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-accent hover:text-primary"
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
              className="pointer-events-none absolute -right-12 top-12 -z-10 hidden size-28 rounded-full border-18 border-primary/20 bg-(--green)/15 lg:block"
              aria-hidden="true"
            />

            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span
                  className="size-2.5 rounded-full bg-(--purple)"
                  aria-hidden="true"
                />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                  Project portfolio
                </p>
              </div>
              <span
                className="mt-7 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
                aria-hidden="true"
              />
              <h1 className="mt-7 text-balance text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-[4.2rem]">
                Projects built to make evidence useful.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
                Explore IAHL&apos;s featured project platforms across
                responsible AI, community evidence, and institutional research
                capacity.
              </p>
              <Button asChild size="lg" className="mt-8 rounded-full px-6">
                <Link href="#project-index">
                  Browse all projects <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white">
            <Image
              src="/images/work-knowledge-team.png"
              alt="IAHL researchers reviewing evidence and project priorities together"
              width={1717}
              height={916}
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>

    

      <div>
        {projects.map((project) => (
          <section
            id={project.id}
            className={`scroll-mt-28 overflow-hidden border-b border-border ${project.surface}`}
            key={project.id}
          >
            <div className="mx-auto grid w-[min(1600px,100%)] lg:min-h-162.5 lg:grid-cols-2">
              <div
                className={`flex items-center justify-center bg-white ${
                  project.imageFirst ? "" : "lg:order-2"
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.alt}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full object-contain"
                />
              </div>

              <div
                className={`relative isolate flex min-h-145 items-center overflow-hidden px-[6vw] py-14 sm:min-h-155 lg:min-h-162.5 lg:px-[8vw] ${
                  project.imageFirst ? "" : "lg:order-1"
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 -z-10 ${
                    project.imageFirst
                      ? "lg:left-8 lg:rounded-l-[46%]"
                      : "lg:right-8 lg:rounded-r-[46%]"
                  } ${project.surface}`}
                  aria-hidden="true"
                />

                <div className="max-w-2xl">
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm font-bold uppercase tracking-[0.16em] ${project.accent}`}
                    >
                      {project.eyebrow}
                    </span>
                  </div>
                  <h2 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
                    {project.title}
                  </h2>
                  <p className="mt-5 text-balance text-2xl font-bold leading-snug sm:text-3xl">
                    {project.statement}
                  </p>
                  <p className={`mt-6 text-lg leading-8 ${project.muted}`}>
                    {project.text}
                  </p>

                  <div
                    className={`mt-8 divide-y border-y ${project.divider}`}
                  >
                    {project.points.map((point) => (
                      <div
                        className="flex items-center gap-3 py-4 font-bold"
                        key={point}
                      >
                        <CheckCircle2
                          className={`size-5 shrink-0 ${project.accent}`}
                        />
                        {point}
                      </div>
                    ))}
                  </div>

                  <Link
                    className={`mt-7 inline-flex items-center gap-2 font-bold ${project.accent}`}
                    href={project.pathway}
                  >
                    {project.pathwayLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-[#f4eaf7] py-16 sm:py-20">
        <div className="mx-auto grid w-[min(1180px,92vw)] gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
            Shape the next project
          </p>
          <div>
            <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
              Have a health question that needs research, technology, or
              partnership?
            </h2>
            <Button asChild size="lg" className="mt-7 rounded-full">
              <Link href="/get-involved#contact">
                Start a conversation <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t-4 border-primary bg-[linear-gradient(135deg,#303136_0%,#35363a_48%,#26282d_100%)] text-white">
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
                {[...navItems.slice(0, 3), { label: "Projects", href: "/projects" }].map(
                  (item) => (
                    <Link
                      className="text-sm text-white/70 transition hover:text-primary"
                      href={item.href}
                      key={item.label}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            </div>

            <div>
              <h3 className="font-bold">Projects</h3>
              <div className="mt-4 grid gap-2">
                {projects.map((project) => (
                  <Link
                    className="text-sm text-white/70 transition hover:text-primary"
                    href={`#${project.id}`}
                    key={project.id}
                  >
                    {project.title}
                  </Link>
                ))}
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
