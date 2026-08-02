import CogIcon from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

export const organizationDetails = defineType({
  name: 'organizationDetails',
  title: 'Organization details',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'publicEmail',
      title: 'Public email address',
      type: 'string',
      description: 'The email address displayed publicly on the website.',
      initialValue: 'info@innovateaihealthlab.co.ke',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'postalAddress',
      title: 'Postal address',
      type: 'text',
      rows: 2,
      initialValue: 'P.O. Box 408 – 10200, Murang’a, Kenya',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'phone',
      title: 'Telephone number',
      type: 'string',
      description:
        'Public telephone number, including the international dialing code.',
      validation: (rule) =>
        rule
          .regex(/^\+?[0-9()\s-]+$/, {name: 'telephone number'})
          .max(40),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Organization details',
        subtitle: 'Public contact information',
      }
    },
  },
})
