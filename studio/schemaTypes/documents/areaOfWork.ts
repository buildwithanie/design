import { TagIcon } from '@sanity/icons/Tag';
import {defineField, defineType} from 'sanity'

export const areaOfWork = defineType({
  name: 'areaOfWork',
  title: 'Area of Work',
  type: 'document',
  icon: TagIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'The strategic area this project contributes to, such as Responsible AI and data.',
      validation: (rule) => rule.required().max(80),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Generate this from the title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A short explanation of what this area of work covers.',
      validation: (rule) => rule.max(240),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
