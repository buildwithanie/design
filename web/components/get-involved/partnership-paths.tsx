import type { GET_INVOLVED_PAGE_QUERY_RESULT } from "@/sanity.types";

type GetInvolvedContent = NonNullable<GET_INVOLVED_PAGE_QUERY_RESULT["page"]>;

const pathColors = ["bg-primary", "bg-(--cyan)", "bg-(--green)"] as const;

export function PartnershipPaths({ content }: { content: GetInvolvedContent }) {
  return (
    <section className="bg-[#fffdf8] pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pb-14">
      <div className="mx-auto w-[min(1040px,92vw)]">
        <div className="max-w-2xl">
          <h2 className="text-balance text-4xl leading-tight font-bold sm:text-5xl">
            {content.partnershipsHeading}
          </h2>
        </div>

        <div className="mt-8 border-y border-border">
          {content.partnershipPaths.map((path, index) => (
            <article
              key={path._key}
              className="grid gap-4 border-b border-border py-6 last:border-b-0 sm:py-7 md:grid-cols-[minmax(220px,0.7fr)_minmax(0,1fr)] md:items-center md:gap-12"
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
