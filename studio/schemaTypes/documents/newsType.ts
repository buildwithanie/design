import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'

export const newsType = defineType({
  name: 'newsType',
  title: 'News type',
  type: 'document',
  icon: TagIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'For example, Research insight, Field story, Partnership update, or Organization update.',
      validation: (rule) => rule.required().max(80),
    }),

    defineField({
      name: 'slug',
      title: 'Identifier',
      type: 'slug',
      description:
        'Generate this from the title. It provides a stable value for URLs and future filtering.',

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
