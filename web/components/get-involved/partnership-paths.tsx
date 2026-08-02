import type { GET_INVOLVED_PAGE_QUERY_RESULT } from "@/sanity.types";

type GetInvolvedContent = NonNullable<GET_INVOLVED_PAGE_QUERY_RESULT["page"]>;

const pathColors = ["bg-primary", "bg-(--cyan)", "bg-(--green)"] as const;

export function PartnershipPaths({ content }: { content: GetInvolvedContent }) {
  return (
    <section className="bg-[#fffdf8] py-14 sm:py-18 lg:py-20">
      <div className="mx-auto w-[min(1040px,92vw)]">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            {content.partnershipsLabel}
          </p>

          <h2 className="mt-3 text-balance text-4xl leading-tight font-bold sm:text-5xl">
            {content.partnershipsHeading}
          </h2>
        </div>

        <div className="mt-10 border-y border-border">
          {content.partnershipPaths.map((path, index) => (
            <article
              key={path._key}
              className="grid gap-4 border-b border-border py-7 last:border-b-0 sm:py-8 md:grid-cols-[minmax(220px,0.7fr)_minmax(0,1fr)] md:items-center md:gap-12"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`h-10 w-1 shrink-0 ${pathColors[index % pathColors.length]}`}
                  aria-hidden="true"
                />

                <h3 className="text-2xl leading-snug font-bold">
                  {path.title}
                </h3>
              </div>

              <p className="max-w-xl leading-7 text-muted-foreground">
                {path.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
