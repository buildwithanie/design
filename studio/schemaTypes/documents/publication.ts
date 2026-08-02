import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  icon: DocumentTextIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Publication title',
      type: 'string',
      validation: (rule) => rule.required().max(180),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publication date',
      type: 'date',
      description:
        'Use the publication date shown on the resource. The website will display its year.',

      options: {
        dateFormat: 'YYYY-MM-DD',
      },

      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true

          const today = new Date().toISOString().slice(0, 10)

          return value <= today || 'Publication date cannot be in the future.'
        }),
    }),

    defineField({
      name: 'deliveryType',
      title: 'Resource destination',
      type: 'string',
      description: 'Choose whether visitors download a PDF from IAHL or open another website.',

      options: {
        list: [
          {
            title: 'Uploaded PDF',
            value: 'file',
          },
          {
            title: 'External resource',
            value: 'external',
          },
        ],
        layout: 'radio',
      },

      initialValue: 'file',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'file',
      title: 'PDF file',
      type: 'file',
      description: 'Upload the publication as a PDF.',

      options: {
        accept: 'application/pdf',
      },

      hidden: ({parent}) => parent?.deliveryType !== 'file',

      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as
            | {
                deliveryType?: 'file' | 'external'
              }
            | undefined

          if (parent?.deliveryType === 'file' && !value?.asset) {
            return 'Upload the PDF file.'
          }

          return true
        }),
    }),

    defineField({
      name: 'externalUrl',
      title: 'External resource URL',
      type: 'url',
      description: 'The page where visitors can access the resource.',

      hidden: ({parent}) => parent?.deliveryType !== 'external',

      validation: (rule) =>
        rule
          .uri({
            scheme: ['http', 'https'],
          })
          .custom((value, context) => {
            const parent = context.parent as
              | {
                  deliveryType?: 'file' | 'external'
                }
              | undefined

            if (parent?.deliveryType === 'external' && !value) {
              return 'Add the external resource URL.'
            }

            return true
          }),
    }),

    defineField({
      name: 'externalSource',
      title: 'External publisher or source',
      type: 'string',
      description: 'For example, WHO, a research journal, or a partner organization.',

      hidden: ({parent}) => parent?.deliveryType !== 'external',

      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as
            | {
                deliveryType?: 'file' | 'external'
              }
            | undefined

          if (parent?.deliveryType === 'external' && !value?.trim()) {
            return 'Add the publisher or source.'
          }

          return true
        }),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      deliveryType: 'deliveryType',
    },

    prepare({title, publishedAt, deliveryType}) {
      const year = typeof publishedAt === 'string' ? publishedAt.slice(0, 4) : null

      const details = [
        year,
        deliveryType === 'external' ? 'External' : 'PDF',
      ].filter(Boolean)

      return {
        title,
        subtitle: details.join(' · '),
      }
    },
  },
})
