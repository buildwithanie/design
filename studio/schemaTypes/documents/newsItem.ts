import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

export const newsItem = defineType({
  name: 'newsItem',
  title: 'News and insight',
  type: 'document',
  icon: DocumentTextIcon,

  fields: [
    defineField({
      name: 'destination',
      title: 'Content destination',
      type: 'string',
      description: 'Choose whether this content is published by IAHL or links to another website.',

      options: {
        list: [
          {
            title: 'IAHL article',
            value: 'internal',
          },
          {
            title: 'External coverage',
            value: 'external',
          },
        ],
        layout: 'radio',
      },

      initialValue: 'internal',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'newsType',
      title: 'News type',
      type: 'reference',
      description: 'Select the editorial category that best describes this item.',
      to: [{type: 'newsType'}],
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
      description: 'Used in the IAHL article URL.',

      options: {
        source: 'title',
        maxLength: 96,
      },

      hidden: ({parent}) => parent?.destination === 'external',

      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as
            | {
                destination?: 'internal' | 'external'
              }
            | undefined

          if (parent?.destination === 'internal' && !value?.current) {
            return 'A slug is required for IAHL articles.'
          }

          return true
        }),
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'A concise introduction used on the Media Center and news archive.',

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

          return value <= today || 'News publication date cannot be in the future.'
        }),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'accessibleImage',
      description: 'Used on the Media Center, news archive, article page, and social previews.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'externalSource',
      title: 'Publisher or source',
      type: 'string',
      description: 'For example, WHO, a newspaper, or a partner organisation.',
      hidden: ({parent}) => parent?.destination !== 'external',

      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as
            | {
                destination?: 'internal' | 'external'
              }
            | undefined

          if (parent?.destination === 'external' && !value?.trim()) {
            return 'Add the publisher or source.'
          }

          return true
        }),
    }),

    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'The original article or coverage URL.',
      hidden: ({parent}) => parent?.destination !== 'external',

      validation: (rule) =>
        rule
          .uri({
            scheme: ['http', 'https'],
          })
          .custom((value, context) => {
            const parent = context.parent as
              | {
                  destination?: 'internal' | 'external'
                }
              | undefined

            if (parent?.destination === 'external' && !value) {
              return 'Add the external article URL.'
            }

            return true
          }),
    }),

    defineField({
      name: 'body',
      title: 'Article content',
      type: 'portableContent',
      description:
        'Build the article using headings, text, lists, links, quotes, images, and galleries.',

      hidden: ({parent}) => parent?.destination === 'external',

      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as
            | {
                destination?: 'internal' | 'external'
              }
            | undefined

          if (parent?.destination === 'internal' && (!Array.isArray(value) || value.length === 0)) {
            return 'Add article content.'
          }

          return true
        }),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      newsType: 'newsType.title',
      destination: 'destination',
      publishedAt: 'publishedAt',
      media: 'coverImage',
    },

    prepare({title, newsType, destination, publishedAt, media}) {
      const details = [
        newsType,
        publishedAt,
        destination === 'external' ? 'External' : 'IAHL article',
      ].filter(Boolean)

      return {
        title,
        subtitle: details.join(' · '),
        media,
      }
    },
  },
})
