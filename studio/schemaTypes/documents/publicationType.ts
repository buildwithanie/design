import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'

export const publicationType = defineType({
  name: 'publicationType',
  title: 'Publication type',
  type: 'document',
  icon: TagIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'For example, Research brief, Practice note, Report, or Learning resource.',
      validation: (rule) => rule.required().max(80),
    }),

    defineField({
      name: 'slug',
      title: 'Identifier',
      type: 'slug',
      description:
        'Generate this from the title. It provides a stable identifier if filtering is added later.',

      options: {
        source: 'title',
        maxLength: 80,
      },

      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
