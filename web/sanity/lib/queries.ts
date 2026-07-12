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
    missionStatement,
    featuredProjectsHeading,
    featuredProjects[]-> {
      _id,
      title,
      "slug": slug.current,
      status,
      summary,
      coverImage {
        asset,
        crop,
        hotspot,
        decorative,
        alt
      },
      areaOfWork-> {
        title,
        "slug": slug.current
      },
      projectType-> {
        title,
        "slug": slug.current
      }
    }
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]
    | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      status,
      summary,
      coverImage {
        asset,
        crop,
        hotspot,
        decorative,
        alt
      },
      areaOfWork-> {
        title,
        "slug": slug.current
      },
      projectType-> {
        title,
        "slug": slug.current
      }
    }
`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "project" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    status,
    summary,

    coverImage {
      asset,
      crop,
      hotspot,
      decorative,
      alt
    },

    areaOfWork-> {
      title,
      "slug": slug.current
    },

    projectType-> {
      title,
      "slug": slug.current
    },

    body[] {
      ...,

      _type == "projectImage" => {
        ...,
        asset,
        alt,
        caption,
        credit,
        "dimensions": asset->metadata.dimensions,
        "lqip": asset->metadata.lqip
      },

      _type == "projectImageGallery" => {
        ...,

        images[] {
          ...,
          asset,
          alt,
          caption,
          credit,
          "dimensions": asset->metadata.dimensions,
          "lqip": asset->metadata.lqip
        }
      }
    }
  }
`);