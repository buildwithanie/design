import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      name: 'hero',
      title: 'Hero',
      default: true,
    },
    {
      name: 'researchNetwork',
      title: 'Where we begin',
    },
  ],
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero headline',
      type: 'string',
      group: 'hero',
      description: 'The first part of the main heading.',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: 'heroHighlightedText',
      title: 'Highlighted ending',
      type: 'string',
      group: 'hero',
      description: 'The final highlighted part of the main heading.',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'accessibleImage',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'researchHeading',
      title: 'Section heading',
      type: 'string',
      group: 'researchNetwork',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'researchDescription',
      title: 'Section description',
      type: 'text',
      rows: 3,
      group: 'researchNetwork',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'researchMapImage',
      title: 'Africa map image',
      type: 'accessibleImage',
      group: 'researchNetwork',
      description: 'The photograph displayed inside the Africa-shaped map.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'researchParticipants',
      title: 'Research network participants',
      type: 'array',
      group: 'researchNetwork',
      description:
        'The design requires exactly four participant groups. They may be reordered but not added or removed.',
      of: [
        defineArrayMember({
          type: 'networkParticipant',
        }),
      ],
      validation: (rule) =>
        rule.required().length(4).error('Exactly four participant groups are required.'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home page',
        subtitle: 'Website landing page',
      }
    },
  },
})
