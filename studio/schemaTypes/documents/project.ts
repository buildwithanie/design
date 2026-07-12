import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

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
      type: 'portableContent',
      description:
        'Build the project story using headings, text, lists, links, quotes, images, and galleries.',

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
