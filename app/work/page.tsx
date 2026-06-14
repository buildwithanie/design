"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Database,
  FlaskConical,
  HeartPulse,
  Menu,
  UsersRound,
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

const pathways = [
  {
    number: "01",
    eyebrow: "Community intelligence",
    title: "Research begins with questions people recognize as their own.",
    text: "IAHL works with communities and health teams to identify priorities, understand lived realities, and build evidence that reflects the context in which decisions will be made.",
    image: "/images/project-community-equity.png",
    alt: "Community members and a researcher discussing local health priorities",
    bullets: [
      "Community-defined research priorities",
      "Mixed-method field inquiry",
      "Findings returned in useful forms",
    ],
    background: "bg-accent/35",
    accent: "text-primary",
  },
  {
    number: "02",
    eyebrow: "Responsible AI and data",
    title: "Technology supports judgment. It does not replace responsibility.",
    text: "We explore how data systems and responsible AI can help research teams identify patterns, ask better questions, and act earlier while protecting transparency, privacy, and human oversight.",
    image: "/images/project-ai-lab.png",
    alt: "Researchers reviewing health data and analytical findings",
    bullets: [
      "Ethical data stewardship",
      "Interpretable research tools",
      "Decision support grounded in evidence",
    ],
    background: "bg-[var(--charcoal)] text-white",
    accent: "text-[var(--cyan)]",
  },
  {
    number: "03",
    eyebrow: "Capacity and partnership",
    title: "Useful research lasts when people and institutions can carry it forward.",
    text: "IAHL strengthens research practice through training, shared methods, institutional collaboration, and partnership models designed for continuity beyond a single project.",
    image: "/images/project-training.png",
    alt: "Health professionals participating in a research learning session",
    bullets: [
      "Applied research learning",
      "Institutional and public-system collaboration",
      "Long-term implementation capacity",
    ],
    background: "bg-background",
    accent: "text-[var(--green)]",
  },
];

const focusAreas = [
  {
    title: "AI and data science",
    text: "Responsible analytical tools for complex health questions.",
    icon: BrainCircuit,
    color: "text-[var(--purple)]",
  },
  {
    title: "Community health systems",
    text: "Evidence shaped around how people access and experience care.",
    icon: UsersRound,
    color: "text-primary",
  },
  {
    title: "Disease surveillance",
    text: "Earlier insight into changing risks, patterns, and priorities.",
    icon: Activity,
    color: "text-[var(--cyan)]",
  },
  {
    title: "Digital health innovation",
    text: "Practical technologies that strengthen research and delivery.",
    icon: Database,
    color: "text-[var(--green)]",
  },
  {
    title: "Research capacity",
    text: "Methods, skills, and confidence for locally led inquiry.",
    icon: FlaskConical,
    color: "text-primary",
  },
  {
    title: "Health equity",
    text: "Research choices that make exclusion and unequal outcomes visible.",
    icon: HeartPulse,
    color: "text-[var(--purple)]",
  },
];

const workProcess = [
  {
    number: "01",
    title: "Frame",
    text: "Define the health question with the people closest to it.",
  },
  {
    number: "02",
    title: "Co-design",
    text: "Agree on methods, responsibilities, ethics, and intended value.",
  },
  {
    number: "03",
    title: "Investigate",
    text: "Generate evidence through field research, data, and analysis.",
  },
  {
    number: "04",
    title: "Translate",
    text: "Turn findings into understandable choices and practical tools.",
  },
  {
    number: "05",
    title: "Strengthen",
    text: "Build the capacity and partnerships needed to sustain action.",
  },
];

const workStandards = [
  {
    title: "The question matters locally",
    text: "The work responds to a recognizable health priority rather than technology for its own sake.",
    accent: "text-[var(--purple)]",
  },
  {
    title: "The method earns trust",
    text: "Ethics, transparency, accountability, and data responsibility are designed in from the start.",
    accent: "text-[var(--green)]",
  },
  {
    title: "The evidence can travel",
    text: "Findings are prepared for communities, researchers, practitioners, and decision-makers.",
    accent: "text-primary",
  },
  {
    title: "The value can continue",
    text: "Projects strengthen people and systems instead of creating short-lived dependence.",
    accent: "text-[var(--cyan)]",
  },
];

export default function WorkPage() {
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
                    : item.label === "Our Work"
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
        <div className="mx-auto grid w-[min(1600px,100%)] bg-white lg:min-h-175 lg:grid-cols-[0.46fr_0.54fr]">
          <div className="relative isolate flex min-h-155 items-center overflow-hidden bg-secondary px-[6vw] py-14 sm:min-h-165 sm:py-16 lg:min-h-175 lg:bg-transparent lg:px-[7vw] lg:pr-[9vw]">
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
                  Our work
                </p>
              </div>

              <span
                className="mt-7 block h-1 w-14 bg-[linear-gradient(90deg,var(--purple)_0_35%,var(--green)_35%_68%,var(--orange)_68%)]"
                aria-hidden="true"
              />

              <h1 className="mt-7 max-w-2xl text-balance text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
                Health research designed to move.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
                From a question raised in a community to evidence used by a
                health team, IAHL connects research, responsible technology,
                and partnership around practical health priorities.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full px-6"
                >
                  <Link href="#pathways">
                    Explore our pathways <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full border-(--purple)/20 bg-white/65 px-6 hover:bg-white"
                >
                  <Link href="/get-involved#partner">
                    Discuss a partnership
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white">
            <Image
              src="/images/work-hero-community-listening.png"
              alt="An IAHL field researcher listening to community members during a local health research discussion"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="grid border-y border-border sm:grid-cols-3">
          {[
            ["01", "Questions shaped with communities"],
            ["02", "Evidence strengthened by responsible methods"],
            ["03", "Action sustained through partnership"],
          ].map(([number, text]) => (
            <div
              className="flex items-start gap-4 border-b border-border px-[6vw] py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:px-8 last:sm:border-r-0"
              key={number}
            >
              <span className="text-sm font-bold text-primary">{number}</span>
              <p className="font-bold leading-7">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden border-b border-border bg-secondary">
        <div className="mx-auto grid w-[min(1600px,100%)] bg-white lg:min-h-150 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="relative isolate flex min-h-115 items-center overflow-hidden bg-secondary px-[6vw] py-14 sm:min-h-125 sm:py-16 lg:min-h-150 lg:bg-transparent lg:px-[6vw] lg:pr-[5vw]">
            <div
              className="pointer-events-none absolute inset-0 -z-10 bg-secondary lg:right-8 lg:rounded-r-[46%]"
              aria-hidden="true"
            />

            <div className="max-w-lg">
              <div className="flex items-center gap-3">
                <span
                  className="size-2.5 rounded-full bg-(--purple)"
                  aria-hidden="true"
                />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
                  What the work must do
                </p>
              </div>

              <span
                className="mt-7 block h-1 w-14 bg-primary"
                aria-hidden="true"
              />

              <h2 className="mt-7 text-balance text-3xl font-bold leading-[1.08] text-foreground sm:text-4xl lg:text-[2.7rem]">
                Produce knowledge people can understand, institutions can use,
                and communities can question.
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                IAHL connects research, technology, training, and
                implementation so evidence can become action without losing
                context or trust.
              </p>

              <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-(--green)">
                <span
                  className="h-px w-8 bg-(--green)"
                  aria-hidden="true"
                />
                Evidence made useful
              </div>
            </div>

            <div
              className="pointer-events-none absolute bottom-12 right-12 hidden size-14 rounded-full border-10 border-primary bg-(--purple) sm:block lg:bottom-auto lg:right-16 lg:top-12"
              aria-hidden="true"
            />
          </div>

          <div className="flex items-center justify-center bg-white">
            <Image
              src="/images/work-knowledge-team.png"
              alt="IAHL team members reviewing a document beside the Innovate AI HealthLab identity"
              width={1717}
              height={916}
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>

      <div id="pathways">
        <section className="overflow-hidden border-t border-border bg-white">
          <div className="mx-auto grid w-[min(1600px,100%)] lg:min-h-162.5 lg:grid-cols-[0.58fr_0.42fr]">
            <div className="flex items-center justify-center bg-white">
              <Image
                src="/images/community-intelligence-feature.png"
                alt="Community intelligence artwork connecting local insight, community dialogue, and health evidence"
                width={1720}
                height={914}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="relative isolate flex min-h-142.5 items-center overflow-hidden bg-secondary px-[6vw] py-14 sm:min-h-152.5 sm:py-16 lg:min-h-162.5 lg:bg-transparent lg:pl-[9vw] lg:pr-[5vw]">
              <div
                className="pointer-events-none absolute inset-0 -z-10 bg-secondary lg:left-8 lg:rounded-l-[46%]"
                aria-hidden="true"
              />

              <div className="max-w-lg">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-primary">01</span>
                  <span className="text-sm font-bold uppercase tracking-[0.16em] text-(--purple)">
                    Community intelligence
                  </span>
                </div>

                <span
                  className="mt-7 block h-1 w-14 bg-primary"
                  aria-hidden="true"
                />

                <h2 className="mt-7 text-balance text-3xl font-bold leading-[1.08] text-foreground sm:text-4xl lg:text-[2.7rem]">
                  Research begins with questions people recognize as their own.
                </h2>

                <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  IAHL works with communities and health teams to identify
                  priorities, understand lived realities, and build evidence
                  that reflects the context in which decisions will be made.
                </p>

                <div className="mt-8 divide-y divide-border border-t border-border">
                  {pathways[0].bullets.map((bullet) => (
                    <div
                      className="flex items-center gap-3 py-3.5 font-bold"
                      key={bullet}
                    >
                      <CheckCircle2 className="size-5 shrink-0 text-(--green)" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="pointer-events-none absolute bottom-10 left-12 hidden size-14 rounded-full border-10 border-primary bg-(--purple) sm:block lg:bottom-auto lg:left-16 lg:top-12"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-white/10 bg-(--charcoal) py-16 text-white sm:py-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                "linear-gradient(rgba(54,172,208,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(54,172,208,0.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage:
                "linear-gradient(to right, black, transparent 52%, transparent)",
            }}
            aria-hidden="true"
          />

          <div className="relative mx-auto grid w-[min(1380px,92vw)] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <div className="relative mx-auto w-full max-w-2xl px-5 py-8 sm:px-10 sm:py-12">
              <div
                className="absolute inset-2 translate-x-4 translate-y-4 border-2 border-(--cyan)/70nset-6"
                style={{
                  clipPath:
                    "polygon(10% 0, 90% 0, 100% 16%, 100% 84%, 90% 100%, 10% 100%, 0 84%, 0 16%)",
                }}
                aria-hidden="true"
              />

              <div
                className="relative overflow-hidden bg-white"
                style={{
                  clipPath:
                    "polygon(10% 0, 90% 0, 100% 16%, 100% 84%, 90% 100%, 10% 100%, 0 84%, 0 16%)",
                }}
              >
                <Image
                  src="/images/project-ai-lab.png"
                  alt="Researchers reviewing health data and analytical findings"
                  width={1536}
                  height={1024}
                  sizes="(max-width: 1024px) 86vw, 42vw"
                  className="h-auto w-full object-contain"
                />
              </div>

              <div
                className="absolute left-0 top-1/4 size-16 rounded-full border-10 border-(--charcoal) bg-(--purple) sm:size-20 sm:border-12"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-2 right-0 grid size-14 place-items-center rounded-full border-8 border-(--charcoal) bg-primary sm:size-16"
                aria-hidden="true"
              >
                <span className="size-2 rounded-full bg-white" />
              </div>
              <div
                className="absolute right-[12%] top-0 flex gap-2"
                aria-hidden="true"
              >
                {[0, 1, 2, 3].map((dot) => (
                  <span
                    className="size-2 rounded-full bg-(--green)"
                    key={dot}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-(--cyan)">02</span>
                <span className="text-sm font-bold uppercase tracking-[0.16em] text-(--cyan)">
                  Responsible AI and data
                </span>
              </div>

              <span
                className="mt-7 block h-1 w-14 bg-(--purple)"
                aria-hidden="true"
              />

              <h2 className="mt-7 max-w-3xl text-balance text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[3.5rem]">
                Technology supports judgment. It does not replace
                responsibility.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                We explore how data systems and responsible AI can help
                research teams identify patterns, ask better questions, and
                act earlier while protecting transparency, privacy, and human
                oversight.
              </p>

              <div className="mt-9 divide-y divide-white/15 border-t border-white/15">
                {pathways[1].bullets.map((bullet) => (
                  <div
                    className="flex items-center gap-3 py-4 font-bold"
                    key={bullet}
                  >
                    <CheckCircle2 className="size-5 shrink-0 text-(--cyan)" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-t border-border bg-white">
          <div className="mx-auto grid w-[min(1600px,100%)] lg:min-h-162.5 lg:grid-cols-[0.44fr_0.56fr]">
            <div className="relative isolate flex min-h-147.5 items-center overflow-hidden bg-[#f5edf7] px-[6vw] py-14 sm:min-h-157.5 sm:py-16 lg:min-h-162.5 lg:bg-transparent lg:px-[6vw] lg:pr-[7vw]">
              <div
                className="pointer-events-none absolute inset-y-8 left-7 right-0 -z-30 hidden rounded-r-[48%] bg-primary lg:block"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-y-4 left-3 right-4 -z-20 hidden rounded-r-[48%] bg-(--green) lg:block"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 -z-10 bg-[#f5edf7] lg:right-8 lg:rounded-r-[48%]"
                aria-hidden="true"
              />

              <div className="max-w-lg">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-primary">03</span>
                  <span className="text-sm font-bold uppercase tracking-[0.16em] text-(--purple)">
                    Capacity and partnership
                  </span>
                </div>

                <span
                  className="mt-7 block h-1 w-14 bg-[linear-gradient(90deg,var(--purple)_0_38%,var(--green)_38%_68%,var(--orange)_68%)]"
                  aria-hidden="true"
                />

                <h2 className="mt-7 text-balance text-3xl font-bold leading-[1.08] text-foreground sm:text-4xl lg:text-[2.7rem]">
                  Useful research lasts when people and institutions can carry
                  it forward.
                </h2>

                <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  IAHL strengthens research practice through training, shared
                  methods, institutional collaboration, and partnership models
                  designed for continuity beyond a single project.
                </p>

                <div className="mt-8 divide-y divide-(--purple)/15 border-t border-(--purple)/15">
                  {pathways[2].bullets.map((bullet) => (
                    <div
                      className="flex items-center gap-3 py-3.5 font-bold"
                      key={bullet}
                    >
                      <CheckCircle2 className="size-5 shrink-0 text-(--green)" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="pointer-events-none absolute bottom-10 right-12 hidden size-16 rounded-full border-10der-[#f5edf7] bg-(--cyan) sm:block lg:bottom-auto lg:right-14 lg:top-12"
                aria-hidden="true"
              >
                <span className="absolute inset-3 rounded-full bg-(--purple)" />
              </div>
            </div>

            <div className="flex items-center justify-center bg-white">
              <Image
                src="/images/capacity-partnership-hands.png"
                alt="A diverse team stacking their hands in a shared commitment to partnership"
                width={1672}
                height={941}
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </section>
      </div>

      <section className="border-y border-border bg-[#f3f4f5] py-16 sm:py-24">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Areas of practice
              </p>
              <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
                Six areas, one connected research agenda.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
              Each area can stand alone, but the strongest work usually draws
              on several at once.
            </p>
          </div>

          <div className="mt-12 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <article
                  className={`border-b border-border px-6 py-8 ${
                    index % 3 !== 2 ? "lg:border-r" : ""
                  } ${index % 2 === 0 ? "sm:border-r lg:border-r" : ""}`}
                  key={area.title}
                >
                  <Icon className={`size-8 ${area.color}`} strokeWidth={1.7} />
                  <h3 className="mt-5 text-2xl font-bold">{area.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {area.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground sm:py-24">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
                From question to impact
              </p>
              <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
                A clear route through complex work.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-primary-foreground/75 lg:justify-self-end">
              Projects may differ, but the work remains accountable to a shared
              sequence from definition to sustained use.
            </p>
          </div>

          <div className="relative mt-12 grid gap-8 md:grid-cols-5 md:gap-5">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-primary-foreground/35 md:block" />
            {workProcess.map((step) => (
              <article className="relative" key={step.number}>
                <div className="relative z-10 grid size-10 place-items-center rounded-full border border-primary-foreground/50 bg-primary text-sm font-bold">
                  {step.number}
                </div>
                <h3 className="mt-5 text-2xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-primary-foreground/75">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-border bg-white">
        <div className="mx-auto w-[min(1600px,100%)] lg:relative lg:min-h-190">
          <div className="flex items-center justify-center bg-white lg:absolute lg:inset-y-0 lg:left-0 lg:w-[68%]">
            <Image
              src="/images/work-selection-review.png"
              alt="A researcher carefully reviewing evidence and project documents"
              width={1670}
              height={941}
              sizes="(max-width: 1024px) 100vw, 68vw"
              className="h-auto w-full object-contain"
            />
          </div>

          <div className="relative z-10 flex min-h-162.5 items-center bg-secondary px-[6vw] py-14 sm:min-h-175 sm:py-16 lg:ml-auto lg:min-h-190 lg:w-[52%] lg:rounded-l-[48%] lg:bg-secondary lg:pl-[11vw] lg:pr-[5vw]">
            <div className="w-full max-w-2xl">
              <div className="flex items-center gap-3">
                <span
                  className="size-2.5 rounded-full bg-(--purple)"
                  aria-hidden="true"
                />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
                  How we choose work
                </p>
              </div>

              <span
                className="mt-6 block h-1 w-14 bg-primary"
                aria-hidden="true"
              />

              <h2 className="mt-6 max-w-2xl text-balance text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[2.8rem]">
                Not every promising idea becomes an IAHL project.
              </h2>

              <div className="mt-9 grid border-t border-(--purple)/15 sm:grid-cols-2">
                {workStandards.map((standard, index) => (
                  <article
                    className={`relative py-5 sm:min-h-43.75 sm:px-5 ${
                      index % 2 === 0
                        ? "sm:border-r sm:border-(--purple)/15 sm:pl-0"
                        : "sm:pr-0"
                    } ${
                      index < 3 ? "border-b border-(--purple)/15" : ""
                    } ${index === 2 ? "sm:border-b-0" : ""}`}
                    key={standard.title}
                  >
                    <span className={`text-sm font-bold ${standard.accent}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-xl font-bold leading-snug">
                      {standard.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {standard.text}
                    </p>
                  </article>
                ))}
              </div>

              <div
                className="mt-7 flex items-center gap-2"
                aria-hidden="true"
              >
                <span className="h-1 w-8 bg-(--purple)" />
                <span className="h-1 w-8 bg-(--green)" />
                <span className="h-1 w-8 bg-primary" />
                <span className="h-1 w-8 bg-(--cyan)" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-border bg-(--charcoal)">
        <div className="relative mx-auto w-[min(1600px,100%)] bg-(--charcoal)">
          <div className="bg-white">
            <Image
              src="/images/community-partnership-conversation.png"
              alt="An IAHL researcher listening to a community partner during a collaborative discussion"
              width={1744}
              height={902}
              sizes="100vw"
              className="h-auto w-full object-contain"
            />
          </div>

          <div className="relative z-10 mx-auto -mt-2 w-[min(1180px,92vw)] pb-14 sm:pb-16 lg:-mt-44">
            <div className="relative ml-auto overflow-hidden rounded-[3rem_3rem_1rem_3rem] bg-[#f4eaf7] p-8 shadow-[0_28px_80px_rgba(20,20,24,0.26)] sm:p-10 lg:w-[72%] lg:rounded-[7rem_7rem_1.25rem_7rem] lg:px-16 lg:py-12">
              <div
                className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border-54 border-(--purple)/8"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-16 left-10 size-40 rounded-full border-32 border-(--green)/10"
                aria-hidden="true"
              />

              <div className="relative grid gap-8 lg:grid-cols-[0.38fr_1.62fr] lg:items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="size-2.5 rounded-full bg-(--green)"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
                      Built with, not for
                    </p>
                  </div>
                  <span
                    className="mt-6 block h-1 w-14 bg-primary"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h2 className="max-w-3xl text-balance text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[2.8rem]">
                    IAHL creates the shared space where community priorities,
                    research expertise, and institutional action can meet.
                  </h2>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      asChild
                      size="lg"
                      className="h-12 rounded-full px-6"
                    >
                      <Link href="/get-involved#partner">
                        Partner with IAHL <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-full border-(--purple)/20 bg-white/70 px-6 hover:bg-white"
                    >
                      <Link href="#pathways">Explore the work</Link>
                    </Button>
                  </div>
                </div>
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
                              : "/get-involved"
                      }
                      key={item}
                    >
                      {item}
                    </Link>
                  ),
                )}
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
