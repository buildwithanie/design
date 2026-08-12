import Link from "next/link";

export const mediaViews = {
  news: {
    label: "News and insights",
    pageSize: 5,
  },
  publications: {
    label: "Publications",
    pageSize: 8,
  },
  galleries: {
    label: "Galleries",
    pageSize: 9,
  },
  videos: {
    label: "Videos",
    pageSize: 6,
  },
} as const;

export type MediaView = keyof typeof mediaViews;

export function isMediaView(value: string | undefined): value is MediaView {
  return Boolean(value && value in mediaViews);
}

export function getMediaHref(view: MediaView, page = 1) {
  const params = new URLSearchParams({ view });

  if (page > 1) {
    params.set("page", String(page));
  }

  return `/media?${params.toString()}`;
}

type MediaNavigationProps = {
  activeView: MediaView;
  availableViews: MediaView[];
};

export function MediaNavigation({
  activeView,
  availableViews,
}: MediaNavigationProps) {
  const active = mediaViews[activeView];

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto w-[min(1180px,92vw)] pt-6 sm:pt-8">
        {availableViews.length > 1 ? (
          <nav
            aria-label="Media categories"
            className="overflow-x-auto border-b border-border"
          >
            <ul className="flex min-w-max gap-7 sm:gap-10">
              {availableViews.map((view) => {
                const isActive = view === activeView;

                return (
                  <li key={view}>
                    <Link
                      href={getMediaHref(view)}
                      aria-current={isActive ? "page" : undefined}
                      className={`block border-b-2 px-0.5 pb-4 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-base ${
                        isActive
                          ? "border-primary text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {mediaViews[view].label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        <div className="py-6 sm:py-8">
          <h2 className="text-3xl leading-tight font-bold sm:text-4xl">
            {active.label}
          </h2>
        </div>
      </div>
    </section>
  );
}
