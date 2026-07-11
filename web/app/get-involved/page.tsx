import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { ClientForm } from "@/components/client-form";
import { HashScroll } from "@/components/hash-scroll";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GetInvolvedPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />
      <HashScroll />

      <section className="overflow-hidden pt-24">
        <div className="mx-auto grid w-[min(1600px,100%)] bg-white lg:min-h-165 lg:grid-cols-[0.46fr_0.54fr]">
          <div className="relative isolate flex min-h-142.5 items-center overflow-hidden bg-[#f4eaf7] px-[6vw] py-14 sm:min-h-152.5 lg:min-h-165 lg:bg-transparent lg:px-[7vw] lg:pr-[9vw]">
            <div
              className="pointer-events-none absolute inset-0 -z-20 bg-[#f4eaf7] lg:right-4 lg:rounded-r-[48%]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-12 top-12 -z-10 hidden size-28 rounded-full border-18 border-primary/20 bg-(--green)/15 lg:block"
              aria-hidden="true"
            />

            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span
                  className="size-2.5 rounded-full bg-(--green)"
                  aria-hidden="true"
                />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
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

     

      <section
        id="partner"
        className="scroll-mt-28 overflow-hidden border-y border-border bg-[#f7f7f8]"
      >
        <div className="mx-auto grid w-[min(1600px,100%)] lg:min-h-165 lg:grid-cols-[0.55fr_0.45fr]">
          <div className="flex items-center justify-center bg-white">
            <Image
              src="/images/capacity-partnership-hands.png"
              alt="Partners placing their hands together in a shared commitment"
              width={1672}
              height={941}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="h-auto w-full object-contain"
            />
          </div>

          <div className="relative isolate flex min-h-145 items-center overflow-hidden bg-[#f4eaf7] px-[6vw] py-14 sm:min-h-155 lg:min-h-165 lg:bg-transparent lg:pl-[9vw] lg:pr-[5vw]">
            <div
              className="pointer-events-none absolute inset-0 -z-10 bg-[#f4eaf7] lg:left-8 lg:rounded-l-[48%]"
              aria-hidden="true"
            />
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <UsersRound className="size-6 text-(--purple)" />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
                  Partnerships
                </p>
              </div>
              <span
                className="mt-6 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
                aria-hidden="true"
              />
              <h2 className="mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl">
                Build research value together.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                IAHL works with communities, institutions, health teams, and
                research partners where there is a shared question and a clear
                path to useful public value.
              </p>

              <div className="mt-8 divide-y divide-(--purple)/15 border-y border-(--purple)/15">
                {[
                  "Co-designed research and evidence programs",
                  "Responsible AI and data collaboration",
                  "Training and institutional capacity building",
                ].map((item) => (
                  <div
                    className="flex items-center gap-3 py-4 font-bold"
                    key={item}
                  >
                    <CheckCircle2 className="size-5 shrink-0 text-(--green)" />
                    {item}
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="mt-8 rounded-full">
                <Link href="#contact">
                  Start a partnership conversation
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="careers" className="scroll-mt-28 py-16 sm:py-24">
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

            <div className="mt-8 rounded-[1.5rem_5rem_1.5rem_1.5rem] bg-(--charcoal) p-7 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-(--green)">
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
        id="contact"
        className="scroll-mt-28 overflow-hidden border-b border-border bg-white"
      >
        <div className="mx-auto grid w-[min(1600px,100%)] lg:min-h-180 lg:grid-cols-[0.45fr_0.55fr]">
          <div className="relative isolate flex min-h-162.5 items-center overflow-hidden bg-[#f4eaf7] px-[6vw] py-14 sm:min-h-172.5 lg:min-h-180 lg:bg-transparent lg:px-[7vw] lg:pr-[9vw]">
            <div
              className="pointer-events-none absolute inset-0 -z-10 bg-[#f4eaf7] lg:right-4 lg:rounded-r-[48%]"
              aria-hidden="true"
            />
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
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
                    <UsersRound className="size-5 text-(--green)" />
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
                <ShieldCheck className="size-7 text-(--purple)" />
                <h3 className="mt-4 font-bold">Respect and safeguarding</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  IAHL expects respectful, ethical engagement across research,
                  employment, events, and partnerships.
                </p>
              </div>
            </div>
          </div>

          <div className="grid content-center px-[6vw] py-14 sm:py-16 lg:px-[7vw]">
<ClientForm
              className="mx-auto w-full max-w-2xl rounded-[2rem_7rem_2rem_2rem] border border-border bg-card p-7 shadow-[0_24px_70px_rgba(53,54,58,0.08)] sm:p-10"
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
            </ClientForm>
          </div>
        </div>
      </section>
    </main>
  );
}
