export function MediaIntro() {
  return (
    <section className="relative isolate overflow-hidden bg-secondary pt-24">
      <div
        className="pointer-events-none absolute -right-16 top-32 -z-10 hidden size-52 rounded-full border-28 border-primary/10 lg:block"
        aria-hidden="true"
      />

      <div className="mx-auto w-[min(1180px,92vw)] py-14 sm:py-16 lg:py-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span
              className="size-2.5 rounded-full bg-(--purple)"
              aria-hidden="true"
            />

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Media Center
            </p>
          </div>

          <span
            className="mt-7 block h-1 w-16 bg-[linear-gradient(90deg,var(--purple)_0_25%,var(--cyan)_25%_50%,var(--green)_50%_75%,var(--orange)_75%)]"
            aria-hidden="true"
          />

          <h1 className="mt-7 max-w-3xl text-balance text-5xl leading-[1.02] font-bold sm:text-6xl lg:text-[4.2rem]">
            Research, field learning, and ideas worth sharing.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Follow IAHL&apos;s research, community conversations, partnerships, and
            practical lessons from work across health and technology.
          </p>
        </div>
      </div>
    </section>
  );
}
