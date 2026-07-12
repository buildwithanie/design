type VideoDetailProps = {
  youtubeId: string;
  title: string;
  description: string;
};

export function VideoDetail({
  youtubeId,
  title,
  description,
}: VideoDetailProps) {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto w-[min(1180px,92vw)]">
        <div className="mx-auto max-w-4xl">
          <div className="aspect-video overflow-hidden rounded-xl bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
              title={title}
              className="size-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
