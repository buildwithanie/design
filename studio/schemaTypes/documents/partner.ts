import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Organization name',
      type: 'string',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'accessibleImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      description: 'Optional. When supplied, the logo links to the partner’s website.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'website',
      media: 'logo',
    },
  },
})
