import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0] {
    _id,
    heroHeadline,
    heroHighlightedText,
    heroDescription,
    heroImage {
      asset,
      crop,
      hotspot,
      decorative,
      alt
    },
    researchHeading,
    researchDescription,
    researchMapImage {
      asset,
      crop,
      hotspot,
      decorative,
      alt
    },
    researchParticipants[] {
      _key,
      title,
      description,
      image {
        asset,
        crop,
        hotspot,
        decorative,
        alt
      }
    },
    visionStatement,
    missionStatement
  }
`);
