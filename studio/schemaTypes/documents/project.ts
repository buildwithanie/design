import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import {defineArrayMember, defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentTextIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Project title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the project URL. Generate it from the project title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'areaOfWork',
      title: 'Area of work',
      type: 'reference',
      description: 'Select the strategic area this project contributes to.',
      to: [{type: 'areaOfWork'}],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'projectType',
      title: 'Project type',
      type: 'reference',
      description: 'Optionally describe what kind of initiative this is.',
      to: [{type: 'projectType'}],
    }),

    defineField({
      name: 'status',
      title: 'Project status',
      type: 'string',
      description: 'The current stage of the project.',
      options: {
        list: [
          {title: 'Planned', value: 'planned'},
          {title: 'Active', value: 'active'},
          {title: 'Completed', value: 'completed'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'summary',
      title: 'Short summary',
      type: 'text',
      rows: 3,
      description: 'A concise introduction used on the homepage and project listing.',
      validation: (rule) => [
        rule.required(),
        rule.max(240).warning('Keep the summary under 240 characters when possible.'),
      ],
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'accessibleImage',
      description: 'The main image used on project cards and at the beginning of the project page.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'body',
      title: 'Project content',
      type: 'array',
      description: 'Build the project story using headings, text, lists, links, quotes and images.',
      of: [
        defineArrayMember({
          type: 'block',

          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Section heading', value: 'h2'},
            {title: 'Subheading', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],

          lists: [
            {title: 'Bullet list', value: 'bullet'},
            {title: 'Numbered list', value: 'number'},
          ],

          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],

            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',

                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.required().uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  }),

                  defineField({
                    name: 'openInNewTab',
                    title: 'Open in a new tab',
                    type: 'boolean',
                    description: 'Use this for external websites and downloadable resources.',
                    initialValue: false,
                  }),
                ],
              }),
            ],
          },
        }),

        defineArrayMember({
          name: 'projectImage',
          title: 'Image',
          type: 'image',

          options: {
            hotspot: true,
          },

          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              description: 'Describe the important information shown in the image.',
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional context displayed underneath the image.',
              validation: (rule) => rule.max(180),
            }),

            defineField({
              name: 'credit',
              title: 'Image credit',
              type: 'string',
              description: 'Optional photographer, organization or image-source credit.',
              validation: (rule) => rule.max(120),
            }),
          ],
        }),
      ],

      validation: (rule) => rule.required().min(1).error('Add some content for this project.'),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      areaOfWork: 'areaOfWork.title',
      status: 'status',
      media: 'coverImage',
    },

    prepare({title, areaOfWork, status, media}) {
      const details = [areaOfWork, status].filter(Boolean)

      return {
        title,
        subtitle: details.join(' · '),
        media,
      }
    },
  },
})
