import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'photo',
      title: 'Photograph',
      type: 'accessibleImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'biography',
      title: 'Short biography',
      type: 'text',
      rows: 4,
      description: 'A concise introduction suitable for a team profile card.',
      validation: (rule) => rule.required().max(360),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
