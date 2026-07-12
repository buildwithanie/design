import Image from "next/image";

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

const approachOffsets = [
  "lg:ml-[5%]",
  "lg:mr-[10%] lg:justify-self-end",
  "lg:ml-[14%]",
  "lg:mr-[5%] lg:justify-self-end",
  "lg:ml-[18%]",
];

export function ResearchApproach() {
  return (
    <section className="overflow-hidden py-16 sm:py-20">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">
            Our Approach
          </p>

          <h2 className="text-balance text-4xl leading-tight font-bold sm:text-5xl">
            Five values that shape every research partnership
          </h2>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-235 gap-8 lg:gap-2">
          {values.map((value, index) => {
            const isReverse = index % 2 === 1;

            return (
              <article
                key={value.title}
                className={`relative grid min-w-0 grid-cols-[92px_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-6 lg:w-155 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-7 ${
                  isReverse ? "lg:grid-cols-[minmax(0,1fr)_200px]" : ""
                } ${approachOffsets[index]}`}
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
                  className={`absolute top-1 left-16.5 z-20 grid size-10 place-items-center rounded-full border-[5px] border-background text-[0.64rem] font-bold text-white sm:left-25 sm:size-12 sm:text-xs lg:top-5 lg:left-40.5 lg:size-14 lg:border-8 lg:text-sm ${
                    value.color
                  } ${isReverse ? "lg:right-40.5 lg:left-auto" : ""}`}
                >
                  {value.marker}

                  <span
                    className={`absolute top-8 left-1/2 -z-10 hidden h-20 w-1 -translate-x-1/2 rounded-full lg:block ${value.color}`}
                    aria-hidden="true"
                  />
                </div>

                <div
                  className={`col-start-2 row-start-1 min-w-0 ${
                    isReverse
                      ? "lg:col-start-1 lg:justify-self-end lg:text-right"
                      : ""
                  }`}
                >
                  <h3 className="text-xl leading-snug font-bold sm:text-2xl">
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
  );
}
