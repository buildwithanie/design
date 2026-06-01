"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Our Work", href: "#work" },
  { label: "Media Center", href: "#media" },
  { label: "Get Involved", href: "#involved" },
];

const projects = [
  {
    title: "AI Health Equity Lab",
    tag: "Research",
    image: "/images/project-ai-lab.png",
    text: "Building responsible AI models that help researchers identify health gaps early and translate findings into local action.",
  },
  {
    title: "Community Evidence Hubs",
    tag: "Field work",
    image: "/images/project-community-equity.png",
    text: "Working with communities to define research priorities, collect meaningful evidence, and return insights people can use.",
  },
  {
    title: "Digital Research Partnerships",
    tag: "Training",
    image: "/images/project-training.png",
    text: "Equipping health teams, researchers, and partners with practical tools for ethical, data-informed health programs.",
  },
];

const values = [
  {
    title: "Innovation",
    marker: "AI",
    color: "bg-[var(--cyan)]",
    image: "/images/project-ai-lab.png",
    text: "Practical AI, technology, and forward-thinking research methods for evolving health needs.",
  },
  {
    title: "Impact",
    marker: "IM",
    color: "bg-[var(--green)]",
    image: "/images/hero-health-research.png",
    text: "Measurable change for communities facing immediate and long-term health challenges.",
  },
  {
    title: "Sustainability",
    marker: "SU",
    color: "bg-[var(--orange)]",
    image: "/images/project-training.png",
    text: "Research initiatives built for resource efficiency, responsibility, and continuity.",
  },
  {
    title: "Responsibility",
    marker: "RE",
    color: "bg-[var(--purple)]",
    image: "/images/project-community-equity.png",
    text: "Accountability, ethics, transparency, trust, and respect for every community involved.",
  },
  {
    title: "Empowerment",
    marker: "EM",
    color: "bg-foreground",
    image: "/images/project-training.png",
    text: "Tools and opportunities that help communities shape better health outcomes.",
  },
];

const researchNodes = [
  {
    title: "Ministries",
    image: "/images/project-training.png",
    text: "Align research with public health systems.",
  },
  {
    title: "Universities",
    image: "/images/project-ai-lab.png",
    text: "Strengthen research methods, ethics, and learning.",
  },
  {
    title: "Communities",
    image: "/images/project-community-equity.png",
    text: "Shape the questions, data, and action from the ground.",
  },
  {
    title: "Health teams",
    image: "/images/project-community-equity.png",
    text: "Bring local realities into the evidence we build.",
  },
];

const stories = [
  "Responsible AI for public health decision-making",
  "Community-led research that strengthens local trust",
  "Partnership models for equitable health innovation",
];

const footerLinks = {
  Explore: ["About", "Our work", "Media center", "Reports"],
  Connect: ["Partnerships", "Careers", "Contact", "Newsletter"],
};

const approachOffsets = [
  "lg:ml-[5%]",
  "lg:mr-[10%] lg:justify-self-end",
  "lg:ml-[14%]",
  "lg:mr-[5%] lg:justify-self-end",
  "lg:ml-[18%]",
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex min-h-24 w-[min(1180px,92vw)] items-center justify-between gap-6">
          <a
            className="flex shrink-0 items-center"
            href="#home"
            aria-label="IAHL home"
            onClick={closeMenu}
          >
            <Image
              src="/images/iahl-logo.jpeg"
              alt="Innovate AI HealthLab logo"
              width={164}
              height={120}
              priority
              className="h-16 w-auto object-contain md:h-[76px]"
            />
          </a>

          <nav
            className="hidden items-center gap-2 rounded-full border border-border bg-card/80 p-2 shadow-sm lg:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item, index) => (
              <a
                className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-accent hover:text-primary ${
                  index === navItems.length - 1
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "text-muted-foreground"
                }`}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
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
                <a
                  className="rounded-lg px-4 py-3 text-base font-semibold text-muted-foreground transition hover:bg-accent hover:text-primary"
                  href={item.href}
                  key={item.label}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <section
        id="home"
        className="relative grid min-h-screen items-center overflow-hidden pt-28 lg:grid-cols-[0.92fr_1.08fr]"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(54,172,208,0.1),transparent_28rem),radial-gradient(circle_at_88%_18%,rgba(242,102,34,0.08),transparent_30rem),linear-gradient(135deg,#fffdf8_0%,#ffffff_58%,#fff8f0_100%)]" />

        <div className="mx-auto w-[min(92vw,1180px)] py-16 lg:col-span-2 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Innovate AI HealthLab
            </p>
            <h1 className="text-balance text-5xl font-bold leading-[0.98] text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
              AI-powered health research,{" "}
              <span className="text-[var(--purple)]">shaped by community.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              We bring communities, researchers, and strategic partners together
              to design trustworthy AI solutions for equitable health outcomes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-md px-6">
                <a href="#work">
                  Explore Our Work <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-md px-6"
              >
                <a href="#involved">Partner With Us</a>
              </Button>
            </div>
          </div>

          <div className="mt-12 lg:-mr-14 lg:mt-0 xl:-mr-24">
            <div className="relative overflow-visible rounded-lg">
              <div className="relative aspect-[1619/972] w-full overflow-hidden rounded-lg bg-transparent shadow-2xl lg:w-[112%] xl:w-[120%]">
                <Image
                  src="/images/hero-community-ai-health.png"
                  alt="Community members and a health research facilitator discussing data on a tablet"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 92vw, 66vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="overflow-hidden py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-[min(1180px,94vw)]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Where we begin
            </p>
            <h2 className="text-balance text-5xl font-bold leading-[1.05] sm:text-6xl">
              Africa-led health research.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              People, evidence, and responsible AI working together for fairer
              health outcomes.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-6xl lg:mt-8">
            <div className="lg:hidden">
              <div className="text-center">
                <div className="mx-auto mb-3 size-11 rounded-full bg-[radial-gradient(circle_at_50%_50%,white_0_24%,transparent_25%),conic-gradient(var(--cyan),var(--green),var(--orange),var(--purple),var(--cyan))] shadow-lg" />
                <div className="mx-auto mb-2 h-[3px] w-28 rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--green),var(--orange))]" />
                <p className="text-sm font-bold uppercase text-[var(--purple)]">
                  Continental Research Network
                </p>
              </div>

              <div className="relative mx-auto mt-8 aspect-[0.86] w-[min(430px,82vw)]">
                <div
                  className="absolute inset-0 bg-[linear-gradient(rgba(125,42,145,0.08),rgba(242,102,34,0.08)),url('/images/hero-community-ai-health.png')] bg-cover bg-center drop-shadow-2xl"
                  style={{
                    WebkitMask:
                      'url("/images/africa-map-mask.svg") center / contain no-repeat',
                    mask: 'url("/images/africa-map-mask.svg") center / contain no-repeat',
                  }}
                />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {researchNodes.map((node) => (
                  <Card key={node.title} className="rounded-lg shadow-sm">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-full border-4 border-background bg-secondary shadow-md">
                        <Image
                          src={node.image}
                          alt=""
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

            <div className="relative hidden min-h-[620px] lg:block">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 text-center">
                <div className="mx-auto mb-3 size-11 rounded-full bg-[radial-gradient(circle_at_50%_50%,white_0_24%,transparent_25%),conic-gradient(var(--cyan),var(--green),var(--orange),var(--purple),var(--cyan))] shadow-lg" />
                <div className="mx-auto mb-2 h-[3px] w-28 rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--green),var(--orange))]" />
                <p className="text-sm font-bold uppercase text-[var(--purple)]">
                  Continental Research Network
                </p>
              </div>

              <div className="absolute left-1/2 top-24 aspect-[0.86] w-[min(390px,34vw)] -translate-x-1/2 xl:w-[min(450px,42vw)]">
                <div
                  className="absolute inset-0 bg-[linear-gradient(rgba(125,42,145,0.08),rgba(242,102,34,0.08)),url('/images/hero-community-ai-health.png')] bg-cover bg-center drop-shadow-2xl"
                  style={{
                    WebkitMask:
                      'url("/images/africa-map-mask.svg") center / contain no-repeat',
                    mask: 'url("/images/africa-map-mask.svg") center / contain no-repeat',
                  }}
                />
              </div>

              <div className="absolute left-0 top-28 flex items-center gap-3 xl:gap-4">
                <Card className="max-w-[160px] rounded-lg bg-background/95 text-right shadow-lg xl:max-w-[180px]">
                  <CardContent className="p-4">
                    <h3 className="text-base font-bold">{researchNodes[0].title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {researchNodes[0].text}
                    </p>
                  </CardContent>
                </Card>
                <div className="relative size-32 overflow-hidden rounded-full border-8 border-background bg-secondary shadow-xl xl:size-36">
                  <Image
                    src={researchNodes[0].image}
                    alt=""
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute right-0 top-28 flex items-center gap-3 xl:gap-4">
                <div className="relative size-32 overflow-hidden rounded-full border-8 border-background bg-secondary shadow-xl xl:size-36">
                  <Image
                    src={researchNodes[1].image}
                    alt=""
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>
                <Card className="max-w-[160px] rounded-lg bg-background/95 shadow-lg xl:max-w-[180px]">
                  <CardContent className="p-4">
                    <h3 className="text-base font-bold">{researchNodes[1].title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {researchNodes[1].text}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="absolute bottom-8 left-0 flex items-center gap-3 xl:gap-4">
                <Card className="max-w-[160px] rounded-lg bg-background/95 text-right shadow-lg xl:max-w-[180px]">
                  <CardContent className="p-4">
                    <h3 className="text-base font-bold">{researchNodes[3].title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {researchNodes[3].text}
                    </p>
                  </CardContent>
                </Card>
                <div className="relative size-32 overflow-hidden rounded-full border-8 border-background bg-secondary shadow-xl xl:size-36">
                  <Image
                    src={researchNodes[3].image}
                    alt=""
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute bottom-8 right-0 flex items-center gap-3 xl:gap-4">
                <div>
                  <div className="mb-3 h-[3px] w-28 rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--green),var(--orange))]" />
                  <div className="relative size-32 overflow-hidden rounded-full border-8 border-background bg-secondary shadow-xl xl:size-36">
                    <Image
                      src={researchNodes[2].image}
                      alt=""
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <Card className="max-w-[160px] rounded-lg bg-background/95 shadow-lg xl:max-w-[180px]">
                  <CardContent className="p-4">
                    <h3 className="text-base font-bold">{researchNodes[2].title}</h3>
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

      <section className="py-10">
        <div className="mx-auto grid w-[min(1180px,92vw)] gap-5 lg:grid-cols-2">
          <Card className="rounded-lg border-0 bg-primary text-primary-foreground shadow-lg">
            <CardContent className="p-7 sm:p-9">
              <p className="text-sm font-bold uppercase tracking-[0.16em] opacity-90">
                Our Vision
              </p>
              <h2 className="mt-4 text-balance text-2xl font-bold leading-tight sm:text-3xl">
                A future where health research promotes equity and equality at
                the community level.
              </h2>
            </CardContent>
          </Card>
          <Card className="rounded-lg border-0 bg-[var(--purple)] text-white shadow-lg">
            <CardContent className="p-7 sm:p-9">
              <p className="text-sm font-bold uppercase tracking-[0.16em] opacity-90">
                Our Mission
              </p>
              <h2 className="mt-4 text-balance text-2xl font-bold leading-tight sm:text-3xl">
                To advance health research through AI, innovation, and strategic
                partnerships for equitable health outcomes.
              </h2>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="work" className="py-16 sm:py-20">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Projects
            </p>
            <h2 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
              Focused work with measurable community value
            </h2>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="mt-7 h-11 rounded-md"
            >
              <a href="#work">View all</a>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="group overflow-hidden rounded-lg shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[1.35] bg-secondary">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 92vw, 32vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    {project.tag}
                  </p>
                  <h3 className="mt-3 text-xl font-bold leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {project.text}
                  </p>
                  <Button
                    asChild
                    variant="link"
                    className="mt-4 h-auto p-0 text-primary"
                  >
                    <a href="#">
                      Read more <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="media" className="bg-[var(--charcoal)] py-16 text-white sm:py-20">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Media Center
              </p>
              <h2 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
                Latest thinking from IAHL
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {stories.map((story) => (
                <Card
                  className="rounded-lg border-white/10 bg-white/10 text-white shadow-none"
                  key={story}
                >
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold leading-snug">{story}</h3>
                    <Button
                      asChild
                      variant="link"
                      className="mt-5 h-auto p-0 text-primary"
                    >
                      <a href="#">
                        Read article <ArrowRight className="size-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-16 sm:py-20">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Our Approach
            </p>
            <h2 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
              Five values that shape every research partnership
            </h2>
          </div>

          <div className="relative mx-auto mt-12 grid max-w-[940px] gap-8 lg:gap-2">
            {values.map((value, index) => {
              const isReverse = index % 2 === 1;

              return (
                <article
                  className={`relative grid min-w-0 grid-cols-[92px_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-6 lg:w-[620px] lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-7 ${
                    isReverse ? "lg:grid-cols-[minmax(0,1fr)_200px]" : ""
                  } ${approachOffsets[index]}`}
                  key={value.title}
                >
                  <div
                    className={`relative z-10 col-start-1 row-start-1 size-[92px] overflow-hidden rounded-full border-[7px] border-background bg-secondary shadow-xl sm:size-[132px] lg:size-[200px] lg:border-[10px] ${
                      isReverse ? "lg:col-start-2" : ""
                    }`}
                  >
                    <Image
                      src={value.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 92px, (max-width: 1024px) 132px, 200px"
                      className="object-cover"
                    />
                  </div>

                  <div
                    className={`absolute left-[66px] top-1 z-20 grid size-10 place-items-center rounded-full border-[5px] border-background text-[0.64rem] font-bold text-white sm:left-[100px] sm:size-12 sm:text-xs lg:left-[162px] lg:top-5 lg:size-14 lg:border-8 lg:text-sm ${
                      value.color
                    } ${isReverse ? "lg:left-auto lg:right-[162px]" : ""}`}
                  >
                    {value.marker}
                    <span
                      className={`absolute left-1/2 top-8 -z-10 hidden h-20 w-1 -translate-x-1/2 rounded-full lg:block ${value.color}`}
                    />
                  </div>

                  <div
                    className={`col-start-2 row-start-1 min-w-0 ${
                      isReverse
                        ? "lg:col-start-1 lg:justify-self-end lg:text-right"
                        : ""
                    }`}
                  >
                    <h3 className="text-xl font-bold leading-snug sm:text-2xl">
                      {value.title}
                    </h3>
                    <p className="mt-2 max-w-[360px] break-words text-sm leading-7 text-muted-foreground">
                      {value.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="involved" className="relative overflow-hidden py-16 sm:py-20">
        <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div className="relative">
            
            <div className="relative min-h-[340px] overflow-hidden rounded-lg sm:min-h-[430px] lg:min-h-[540px]">
              <Image
                src="/images/iahl-media-meeting.png"
                alt="IAHL partners in a meeting discussing AI health research"
                fill
                sizes="(max-width: 1024px) 92vw, 54vw"
                className="object-cover object-center"
              />
            </div>
          
          </div>

          <div className="relative">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-[3px] w-16 rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--green),var(--orange))]" />
              <span className="size-3 rounded-full bg-primary" />
              <span className="size-3 rounded-full bg-[var(--purple)]" />
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Get involved
            </p>
            <h2 className="max-w-md text-balance text-5xl font-bold leading-[1.02] sm:text-6xl">
              Partner with us
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              We believe meaningful change happens through collaboration. By
              partnering with us, you become part of a network dedicated to
              innovation, growth, and community impact. Together, we can create
              sustainable solutions that make a real difference.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">
              <span>Research</span>
              <span className="text-primary">Training</span>
              <span>Community</span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-md px-6">
                <a href="#work">
                  Explore partnerships <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-md bg-background/70 px-6"
              >
                <a href="#footer">Contact IAHL</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-accent/60 py-16 sm:py-20">
        <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Work With Us
            </p>
            <h2 className="max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Build a more equitable health future
            </h2>

            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {[
                {
                  title: "Careers",
                  text: "Join a team blending AI, research, and community-centered health innovation.",
                  action: "Open roles",
                },
                {
                  title: "Partner with IAHL",
                  text: "Collaborate on research, training, digital health pilots, and strategic programs.",
                  action: "Partnerships",
                },
              ].map((item) => (
                <Card className="rounded-lg bg-background/90" key={item.title}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 leading-7 text-muted-foreground">
                      {item.text}
                    </p>
                    <Button
                      asChild
                      variant="link"
                      className="mt-4 h-auto p-0 text-primary"
                    >
                      <a href="#">
                        {item.action} <ArrowRight className="size-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-[0.78] w-[min(320px,78vw)] overflow-hidden rounded-lg border border-border bg-card shadow-xl">
            <Image
              src="/work.png"
              alt="Professional welcoming partner"
              fill
              sizes="(max-width: 980px) 78vw, 320px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <footer id="footer" className="bg-[var(--charcoal)] text-white">
        <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Image
              src="/images/iahl-logo.jpeg"
              alt="Innovate AI HealthLab logo"
              width={128}
              height={94}
              className="h-16 w-auto rounded-sm bg-white object-contain"
            />
            <p className="mt-5 max-w-md leading-7 text-white/70">
              Advancing health research through AI, innovation, and strategic
              partnerships for equitable health outcomes.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-bold">{title}</h3>
                <div className="mt-4 grid gap-2">
                  {links.map((link) => (
                    <a
                      className="text-sm text-white/70 transition hover:text-primary"
                      href="#"
                      key={link}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}

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
