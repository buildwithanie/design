import type { HOME_PAGE_QUERY_RESULT } from "@/sanity.types";

export type HomePageData = NonNullable<HOME_PAGE_QUERY_RESULT>;

export type HomeSectionProps = {
  homePage: HomePageData;
};
