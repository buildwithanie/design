import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { urlForImage } from "@/sanity/lib/image";
import { HOME_PAGE_QUERY_RESULT } from "@/sanity.types";

const projects = [
  {
    title: "AI Health Equity Lab",
    tag: "Research",
    image: "/images/project-ai-lab.png",
    text: "Building responsible AI models that help researchers identify health gaps early and translate findings into local action.",
    href: "/projects#ai-health-equity-lab",
  },
  {
    title: "Community Evidence Hubs",
    tag: "Field work",
    image: "/images/project-community-equity.png",
    text: "Working with communities to define research priorities, collect meaningful evidence, and return insights people can use.",
    href: "/projects#community-evidence-hubs",
  },
  {
    title: "Digital Research Partnerships",
    tag: "Training",
    image: "/images/project-training.png",
    text: "Equipping health teams, researchers, and partners with practical tools for ethical, data-informed health programs.",
    href: "/projects#digital-research-partnerships",
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

const stories = [
  {
    title: "Responsible AI for public health decision-making",
    href: "/work#responsible-ai",
  },
  {
    title: "Community-led research that strengthens local trust",
    href: "/work#community-intelligence",
  },
  {
    title: "Partnership models for equitable health innovation",
    href: "/work#capacity-partnership",
  },
];

const approachOffsets = [
  "lg:ml-[5%]",
  "lg:mr-[10%] lg:justify-self-end",
  "lg:ml-[14%]",
  "lg:mr-[5%] lg:justify-self-end",
  "lg:ml-[18%]",
];

export default async function Home() {
  const { data } = await sanityFetch({
    query: HOME_PAGE_QUERY,
  });

  const homePage = data as HOME_PAGE_QUERY_RESULT;

  if (!homePage) {
    throw new Error(
      "The published Sanity homePage document could not be found.",
    );
  }

  const heroImageUrl = urlForImage(homePage.heroImage)
    .width(1619)
    .height(972)
    .fit("crop")
    .auto("format")
    .url();

  const heroImageAlt = homePage.heroImage.decorative
    ? ""
    : (homePage.heroImage.alt ?? "");

  const researchMapImageUrl = urlForImage(
    homePage.researchMapImage ?? homePage.heroImage,
  )
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
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <section
        id="home"
        className="relative grid min-h-screen items-center overflow-hidden pt-10 lg:grid-cols-[0.92fr_1.08fr]"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(54,172,208,0.1),transparent_28rem),radial-gradient(circle_at_88%_18%,rgba(242,102,34,0.08),transparent_30rem),linear-gradient(135deg,#fffdf8_0%,#ffffff_58%,#fff8f0_100%)]" />

        <div className="mx-auto w-[min(92vw,1180px)] py-16 lg:col-span-2 lg:grid lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-8 lg:py-20">
          <p className="mb-8 text-center text-sm font-bold uppercase tracking-[0.18em] text-primary lg:col-span-2 lg:mb-0">
            Innovate AI HealthLab
          </p>
          <div className="max-w-2xl">
            <h1 className="text-balance text-4xl font-bold leading-[1.02] text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              {homePage.heroHeadline}{" "}
              <span className="text-(--purple)">
                {homePage.heroHighlightedText}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              {homePage.heroDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-md px-6">
                <a href="/work">
                  Explore Our Work <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-md px-6"
              >
                <a href="/get-involved#partner">Partner With Us</a>
              </Button>
            </div>
          </div>

          <div className="mt-12 lg:-mr-4 lg:mt-0 xl:-mr-8">
            <div className="relative overflow-visible rounded-lg">
              <div className="relative aspect-1619/972 w-full overflow-hidden rounded-lg bg-transparent shadow-2xl lg:w-[104%] xl:w-[108%]">
                <Image
                  src={heroImageUrl}
                  alt={heroImageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 66vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="overflow-hidden py-5 sm:py-10 lg:py-5">
        <div className="mx-auto w-[min(1180px,94vw)]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Where we begin
            </p>
            <h2 className="text-balance text-5xl font-bold leading-[1.05] sm:text-6xl">
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
              <div className="absolute left-1/2 top-0 -translate-x-1/2 text-center">
                <div className="mx-auto mb-3 size-11 rounded-full bg-[radial-gradient(circle_at_50%_50%,white_0_24%,transparent_25%),conic-gradient(var(--cyan),var(--green),var(--orange),var(--purple),var(--cyan))] shadow-lg" />
                <div className="mx-auto mb-2 h-0.75 w-28 rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--green),var(--orange))]" />
                <p className="text-sm font-bold uppercase text-(--purple)">
                  Continental Research Network
                </p>
              </div>

              <div className="absolute left-1/2 top-24 aspect-[0.86] w-[min(390px,34vw)] -translate-x-1/2 xl:w-[min(450px,42vw)]">
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

              <div className="absolute left-0 top-28 flex items-center gap-3 xl:gap-4">
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

              <div className="absolute right-0 top-28 flex items-center gap-3 xl:gap-4">
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

              <div className="absolute bottom-8 right-0 flex items-center gap-3 xl:gap-4">
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

      <section className="py-10">
        <div className="mx-auto grid w-[min(1180px,92vw)] gap-5 lg:grid-cols-2">
          <Card className="rounded-lg border-0 bg-primary text-primary-foreground shadow-lg">
            <CardContent className="p-7 sm:p-9">
              <p className="text-sm font-bold uppercase tracking-[0.16em] opacity-90">
                Our Vision
              </p>
              <h2 className="mt-4 text-balance text-2xl font-bold leading-tight sm:text-3xl">
                {homePage.visionStatement}
              </h2>
            </CardContent>
          </Card>
          <Card className="rounded-lg border-0 bg-(--purple) text-white shadow-lg">
            <CardContent className="p-7 sm:p-9">
              <p className="text-sm font-bold uppercase tracking-[0.16em] opacity-90">
                Our Mission
              </p>
              <h2 className="mt-4 text-balance text-2xl font-bold leading-tight sm:text-3xl">
                {homePage.missionStatement}
              </h2>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="work" className="py-10 sm:py-10">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Featured projects
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
              <a href="/projects">View all projects</a>
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
                    <a href={project.href}>
                      Read more <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="media" className="bg-(--charcoal) py-16 text-white sm:py-20">
        <div className="mx-auto w-[min(1180px,92vw)]">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Media Center
              </p>
              <h2 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
                Latest thinking from IAHL
              </h2>
              <Button
                asChild
                variant="outline"
                className="mt-6 rounded-full border-white/20 bg-white/5 text-white hover:bg-white hover:text-foreground"
              >
                <a href="/media">
                  Visit the Media Center <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {stories.map((story) => (
                <Card
                  className="rounded-lg border-white/10 bg-white/10 text-white shadow-none"
                  key={story.title}
                >
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold leading-snug">
                      {story.title}
                    </h3>
                    <Button
                      asChild
                      variant="link"
                      className="mt-5 h-auto p-0 text-primary"
                    >
                      <a href={story.href}>
                        Explore topic <ArrowRight className="size-4" />
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

          <div className="relative mx-auto mt-12 grid max-w-235 gap-8 lg:gap-2">
            {values.map((value, index) => {
              const isReverse = index % 2 === 1;

              return (
                <article
                  className={`relative grid min-w-0 grid-cols-[92px_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-6 lg:w-155 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-7 ${
                    isReverse ? "lg:grid-cols-[minmax(0,1fr)_200px]" : ""
                  } ${approachOffsets[index]}`}
                  key={value.title}
                >
                  <div
                    className={`relative z-10 col-start-1 row-start-1 size-23 overflow-hidden rounded-full border-[7px] border-background bg-secondary shadow-xl sm:size-33 lg:size-50 lg:border-10 ${
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
                    className={`absolute left-16.5 top-1 z-20 grid size-10 place-items-center rounded-full border-[5px] border-background text-[0.64rem] font-bold text-white sm:left-25 sm:size-12 sm:text-xs lg:left-40.5 lg:top-5 lg:size-14 lg:border-8 lg:text-sm ${
                      value.color
                    } ${isReverse ? "lg:left-auto lg:right-40.5" : ""}`}
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
                    <p className="mt-2 max-w-90 wrap-break-word text-sm leading-7 text-muted-foreground">
                      {value.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="involved"
        className="relative overflow-hidden py-10 sm:py-10"
      >
        <div className="mx-auto grid w-[min(1180px,92vw)] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div className="relative">
            <Image
              src="/images/iahl-media-meeting.png"
              alt="IAHL partners in a meeting discussing AI health research"
              width={2048}
              height={1024}
              sizes="(max-width: 1024px) 92vw, 54vw"
              className="h-auto w-full rounded-lg object-contain"
            />
          </div>

          <div className="relative">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Get involved
            </p>
            <h2 className="max-w-none whitespace-nowrap text-[clamp(2.35rem,5vw,4rem)] font-bold leading-[1.02]">
              Partner with us
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              We believe meaningful change happens through collaboration. By
              partnering with us, you become part of a network dedicated to
              innovation, growth, and community impact. Together, we can create
              sustainable solutions that make a real difference.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-md px-6">
                <a href="/get-involved#partner">
                  Explore partnerships <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-md bg-background/70 px-6"
              >
                <a href="/get-involved#contact">Contact IAHL</a>
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
                      <a
                        href={
                          item.title === "Careers"
                            ? "/get-involved#careers"
                            : "/get-involved#partner"
                        }
                      >
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
    </main>
  );
}
