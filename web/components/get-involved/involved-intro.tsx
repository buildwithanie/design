import type { GET_INVOLVED_PAGE_QUERY_RESULT } from "@/sanity.types";

type GetInvolvedContent = NonNullable<GET_INVOLVED_PAGE_QUERY_RESULT["page"]>;

export function InvolvedIntro({ content }: { content: GetInvolvedContent }) {
  return (
    <section className="relative isolate overflow-hidden bg-secondary pt-24">
      <div
        className="pointer-events-none absolute -right-20 top-24 -z-10 hidden size-56 rounded-full border-30 border-(--purple)/10 lg:block"
        aria-hidden="true"
      />

      <div className="mx-auto w-[min(1180px,92vw)] py-12 sm:py-14 lg:py-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span
              className="size-2.5 rounded-full bg-(--green)"
              aria-hidden="true"
            />

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-(--purple)">
              {content.introLabel}
            </p>
          </div>

          <span
            className="mt-6 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
            aria-hidden="true"
          />

          <h1 className="mt-6 max-w-3xl text-balance text-5xl leading-[1.03] font-bold sm:text-6xl lg:text-[4rem]">
            {content.introHeading}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {content.introDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
