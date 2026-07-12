import {ImagesIcon} from '@sanity/icons/Images'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {getYouTubeVideoId} from '../../lib/youtube'

export const multimediaItem = defineType({
  name: 'multimediaItem',
  title: 'Gallery or video',
  type: 'document',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media type',
      type: 'string',

      options: {
        list: [
          {
            title: 'Image gallery',
            value: 'gallery',
          },
          {
            title: 'YouTube video',
            value: 'video',
          },
        ],
        layout: 'radio',
      },

      initialValue: 'gallery',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(140),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the gallery or video page URL.',

      options: {
        source: 'title',
        maxLength: 96,
      },

      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'A concise introduction used on multimedia listings and the detail page.',

      validation: (rule) => [
        rule.required(),
        rule.max(240).warning('Keep the summary under 240 characters when possible.'),
      ],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publication date',
      type: 'date',

      options: {
        dateFormat: 'YYYY-MM-DD',
      },

      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true

          const today = new Date().toISOString().slice(0, 10)

          return value <= today || 'Multimedia publication date cannot be in the future.'
        }),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'accessibleImage',
      description:
        'Used on the Media Center, multimedia archive, detail page, and social previews.',

      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'galleryImages',
      title: 'Gallery images',
      type: 'array',
      description:
        'Add the photographs in the order they should appear. Each image can have a caption and credit.',

      hidden: ({parent}) => parent?.mediaType !== 'gallery',

      of: [
        defineArrayMember({
          type: 'contentImage',
        }),
      ],

      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as
            | {
                mediaType?: 'gallery' | 'video'
              }
            | undefined

          if (parent?.mediaType !== 'gallery') {
            return true
          }

          if (!Array.isArray(value) || value.length < 2) {
            return 'Add at least two images to the gallery.'
          }

          if (value.length > 20) {
            return 'A gallery can contain no more than 20 images.'
          }

          return true
        }),
    }),

    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description:
        'Paste the full YouTube video URL. Standard, shortened, Shorts, live, and embed URLs are supported.',

      hidden: ({parent}) => parent?.mediaType !== 'video',

      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as
            | {
                mediaType?: 'gallery' | 'video'
              }
            | undefined

          if (parent?.mediaType !== 'video') {
            return true
          }

          if (!value) {
            return 'Add the YouTube video URL.'
          }

          if (!getYouTubeVideoId(value)) {
            return 'Enter a valid YouTube video URL.'
          }

          return true
        }),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      mediaType: 'mediaType',
      publishedAt: 'publishedAt',
      media: 'coverImage',
    },

    prepare({title, mediaType, publishedAt, media}) {
      const typeLabel = mediaType === 'video' ? 'Video' : mediaType === 'gallery' ? 'Gallery' : null

      const details = [typeLabel, publishedAt].filter(Boolean)

      return {
        title,
        subtitle: details.join(' · '),
        media,
      }
    },
  },
})
