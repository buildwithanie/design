import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'

export const partnershipPath = defineType({
  name: 'partnershipPath',
  title: 'Partnership path',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(180),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
