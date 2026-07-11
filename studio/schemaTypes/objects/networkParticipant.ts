import { UsersIcon } from '@sanity/icons/Users';
import {defineField, defineType} from 'sanity'

export const networkParticipant = defineType({
  name: 'networkParticipant',
  title: 'Research network participant',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'accessibleImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
})
