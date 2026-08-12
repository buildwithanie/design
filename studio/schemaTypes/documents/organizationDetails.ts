import CogIcon from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

export const organizationDetails = defineType({
  name: 'organizationDetails',
  title: 'Organization details',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'identity', title: 'Mission and vision', default: true},
    {name: 'contact', title: 'Contact information'},
  ],
  fields: [
    defineField({
      name: 'visionStatement',
      title: 'Vision statement',
      type: 'text',
      rows: 3,
      group: 'identity',
      description: 'The organization’s long-term ambition, shared across the website.',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission statement',
      type: 'text',
      rows: 3,
      group: 'identity',
      description: 'The organization’s purpose, shared across the website.',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'publicEmail',
      title: 'Public email address',
      type: 'string',
      group: 'contact',
      description: 'The email address displayed publicly on the website.',
      initialValue: 'info@innovateaihealthlab.co.ke',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'postalAddress',
      title: 'Postal address',
      type: 'text',
      group: 'contact',
      rows: 2,
      initialValue: 'P.O. Box 408 – 10200, Murang’a, Kenya',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'phone',
      title: 'Telephone number',
      type: 'string',
      group: 'contact',
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
