"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Menu,
  ShieldCheck,
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



const eventSeries = [
  {
    title: "Community research dialogues",
    text: "Open conversations about local priorities, evidence gaps, and how research teams can remain accountable.",
    tag: "Public dialogue",
    color: "bg-[var(--purple)]",
  },
  {
    title: "Responsible AI roundtables",
    text: "Focused sessions for researchers, institutions, and practitioners navigating data, ethics, and oversight.",
    tag: "Partner forum",
    color: "bg-[var(--cyan)]",
  },
  {
    title: "Applied methods clinics",
    text: "Practical learning sessions that turn research methods and findings into tools teams can use.",
    tag: "Learning session",
    color: "bg-[var(--green)]",
  },
];

export default function GetInvolvedPage() {
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
              className="h-16 w-auto object-contain md:h-[76px]"
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
        <div className="mx-auto grid w-[min(1600px,100%)] bg-white lg:min-h-[660px] lg:grid-cols-[0.46fr_0.54fr]">
          <div className="relative isolate flex min-h-[570px] items-center overflow-hidden bg-[#f4eaf7] px-[6vw] py-14 sm:min-h-[610px] lg:min-h-[660px] lg:bg-transparent lg:px-[7vw] lg:pr-[9vw]">
            <div
              className="pointer-events-none absolute inset-0 -z-20 bg-[#f4eaf7] lg:right-4 lg:rounded-r-[48%]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-12 top-12 -z-10 hidden size-28 rounded-full border-[18px] border-primary/20 bg-[var(--green)]/15 lg:block"
              aria-hidden="true"
            />

            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span
                  className="size-2.5 rounded-full bg-[var(--green)]"
                  aria-hidden="true"
                />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--purple)]">
                  Get involved
                </p>
              </div>
              <span
                className="mt-7 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
                aria-hidden="true"
              />
              <h1 className="mt-7 text-balance text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-[4.2rem]">
                Bring your question. Build the answer with us.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
                Work with IAHL through research partnerships, careers, public
                events, and conversations grounded in shared health priorities.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full px-6">
                  <Link href="#partner">
                    Explore ways to engage <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full border-[var(--purple)]/20 bg-white/65 px-6"
                >
                  <Link href="#contact">Contact IAHL</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white">
            <Image
              src="/images/get-involved-community.png"
              alt="IAHL team members listening and exchanging ideas with community partners"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

      
      </section>

    

      

      <section id="careers" className="py-16 sm:py-24">
        <div className="mx-auto grid w-[min(1240px,92vw)] gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Careers
            </p>
            <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
              Bring expertise. Keep learning.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
              IAHL values curious people who can work across disciplines,
              communicate clearly, and remain accountable to the communities
              and institutions the work is intended to serve.
            </p>

            <div className="mt-8 rounded-[1.5rem_5rem_1.5rem_1.5rem] bg-[var(--charcoal)] p-7 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--green)]">
                Current openings
              </p>
              <h3 className="mt-4 text-2xl font-bold">
                Opportunities will be published here.
              </h3>
              <p className="mt-3 leading-7 text-white/65">
                No role is being advertised on this page right now. You can
                still introduce your experience through the contact form.
              </p>
              <Button asChild className="mt-6 rounded-full">
                <Link href="#contact">Join the talent network</Link>
              </Button>
            </div>
          </div>

          <div>
            <Image
              src="/images/career-team.png"
              alt="A diverse team of professionals representing careers at IAHL"
              width={1562}
              height={1007}
              sizes="(max-width: 1024px) 92vw, 52vw"
              className="h-auto w-full rounded-[2rem_7rem_2rem_2rem] object-contain"
            />

           
          </div>
        </div>
      </section>

      <section
        id="events"
        className="relative overflow-hidden bg-[var(--charcoal)] py-16 text-white sm:py-24"
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
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--cyan)]">
                Events
              </p>
              <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
                Learn, question, and connect.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-white/60 lg:justify-self-end">
              Event dates and registration details are announced through the
              Media Center and IAHL updates.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {eventSeries.map((event, index) => (
              <article
                className="relative min-h-[360px] overflow-hidden rounded-[1.5rem_6rem_1.5rem_1.5rem] border border-white/10 bg-white/5 p-7"
                key={event.title}
              >
                <div
                  className={`absolute -right-12 -top-12 size-44 rounded-full border-[30px] border-white/15 ${event.color}`}
                  aria-hidden="true"
                />
                <div className="relative flex items-center justify-between">
                  <CalendarDays className="size-7 text-primary" />
                  <span className="text-sm font-bold text-white/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="relative mt-10 text-xs font-bold uppercase tracking-[0.16em] text-[var(--green)]">
                  {event.tag}
                </p>
                <h3 className="relative mt-3 text-2xl font-bold leading-tight">
                  {event.title}
                </h3>
                <p className="relative mt-4 leading-7 text-white/60">
                  {event.text}
                </p>
                <div className="absolute bottom-7 left-7 flex items-center gap-2 text-sm font-bold text-white/70">
                  <Clock3 className="size-4" />
                  Schedule announced soon
                </div>
              </article>
            ))}
          </div>

          <Button
            asChild
            variant="outline"
            className="mt-8 rounded-full border-white/20 bg-white/5 text-white hover:bg-white hover:text-foreground"
          >
            <Link href="/media">
              Follow event updates <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="contact" className="overflow-hidden border-b border-border bg-white">
        <div className="mx-auto grid w-[min(1600px,100%)] lg:min-h-[720px] lg:grid-cols-[0.45fr_0.55fr]">
          <div className="relative isolate flex min-h-[650px] items-center overflow-hidden bg-[#f4eaf7] px-[6vw] py-14 sm:min-h-[690px] lg:min-h-[720px] lg:bg-transparent lg:px-[7vw] lg:pr-[9vw]">
            <div
              className="pointer-events-none absolute inset-0 -z-10 bg-[#f4eaf7] lg:right-4 lg:rounded-r-[48%]"
              aria-hidden="true"
            />
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--purple)]">
                Contact IAHL
              </p>
              <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
                Tell us what you are trying to move forward.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Share the question, opportunity, or challenge. We will begin by
                understanding the context and the people who need to be part of
                the conversation.
              </p>

              <div className="mt-9 grid gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-full bg-white">
                    <MapPin className="size-5 text-primary" />
                  </span>
                  <div>
                    <p className="font-bold">Location</p>
                    <p className="text-sm text-muted-foreground">
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-full bg-white">
                    <UsersRound className="size-5 text-[var(--green)]" />
                  </span>
                  <div>
                    <p className="font-bold">Best first step</p>
                    <p className="text-sm text-muted-foreground">
                      Use the form so we can route your message clearly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-9 rounded-[1.25rem_4rem_1.25rem_1.25rem] bg-white/70 p-6">
                <ShieldCheck className="size-7 text-[var(--purple)]" />
                <h3 className="mt-4 font-bold">Respect and safeguarding</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  IAHL expects respectful, ethical engagement across research,
                  employment, events, and partnerships.
                </p>
              </div>
            </div>
          </div>

          <div className="grid content-center px-[6vw] py-14 sm:py-16 lg:px-[7vw]">
            <form
              className="mx-auto w-full max-w-2xl rounded-[2rem_7rem_2rem_2rem] border border-border bg-card p-7 shadow-[0_24px_70px_rgba(53,54,58,0.08)] sm:p-10"
              onSubmit={(event) => event.preventDefault()}
            >
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Start a conversation
              </p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold">
                  Name
                  <Input
                    name="name"
                    placeholder="Your name"
                    className="h-12 bg-background"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Email
                  <Input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 bg-background"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold sm:col-span-2">
                  I am interested in
                  <select
                    name="interest"
                    className="h-12 rounded-md border border-input bg-background px-3 text-sm font-normal outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="partnership">Research partnership</option>
                    <option value="career">Career or talent network</option>
                    <option value="event">Events and learning</option>
                    <option value="media">Media inquiry</option>
                    <option value="general">General inquiry</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-bold sm:col-span-2">
                  Organization
                  <Input
                    name="organization"
                    placeholder="Organization or community"
                    className="h-12 bg-background"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold sm:col-span-2">
                  Message
                  <textarea
                    name="message"
                    placeholder="Tell us about the context, question, or opportunity."
                    rows={6}
                    className="min-h-36 resize-y rounded-md border border-input bg-background px-3 py-3 text-sm font-normal outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  />
                </label>
              </div>

              <Button type="submit" size="lg" className="mt-6 rounded-full">
                Send inquiry <ArrowRight className="size-4" />
              </Button>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                This design currently presents the contact flow. Submission
                delivery can be connected when the preferred inbox or form
                service is available.
              </p>
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
              <h3 className="font-bold">Get involved</h3>
              <div className="mt-4 grid gap-2">
                {[
                  ["Partnerships", "#partner"],
                  ["Careers", "#careers"],
                  ["Events", "#events"],
                  ["Contact", "#contact"],
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

            <form onSubmit={(event) => event.preventDefault()}>
              <h3 className="font-bold">Stay updated</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Receive IAHL news and opportunities.
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
