import { TagIcon } from '@sanity/icons/Tag';
import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'projectType',
  title: 'Project Type',
  type: 'document',
  icon: TagIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'The kind of initiative, such as Research programme or Capacity-building initiative.',
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
      description: 'An optional explanation to help editors choose the correct project type.',
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
