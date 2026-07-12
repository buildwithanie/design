import Image from "next/image";

const images = [
  {
    src: "/images/work-hero-community-listening.png",
    alt: "An IAHL field researcher leading a community listening session",
    caption:
      "Community members discuss the questions and experiences that should inform the research.",
    className: "sm:col-span-2",
  },
  {
    src: "/images/community-partnership-conversation.png",
    alt: "A researcher listening during a conversation with a community partner",
    caption:
      "Listening creates space for priorities that may not be visible in existing data.",
    className: "",
  },
  {
    src: "/images/research-governance-team.png",
    alt: "Researchers reviewing evidence together",
    caption:
      "The research team reviews what was heard and how it affects the study.",
    className: "",
  },
  {
    src: "/images/project-training.png",
    alt: "Participants taking part in an applied research session",
    caption:
      "Shared learning helps communities and research teams work from the same understanding.",
    className: "sm:col-span-2",
  },
];

export function GalleryDetail() {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-8 text-muted-foreground">
            This gallery follows a community listening session from the first
            conversations through to the research team’s reflection on what
            participants shared.
          </p>
        </div>

        <div className="mt-10 grid gap-x-4 gap-y-8 sm:grid-cols-2">
          {images.map((image) => (
            <figure key={image.src} className={image.className}>
              <div
                className={`relative overflow-hidden rounded-lg bg-muted ${
                  image.className ? "aspect-2/1" : "aspect-4/3"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    image.className
                      ? "(max-width: 1180px) 92vw, 1180px"
                      : "(max-width: 640px) 92vw, 46vw"
                  }
                  className="object-cover"
                />
              </div>

              <figcaption className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
