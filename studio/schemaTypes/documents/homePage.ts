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
    {
      name: 'featuredProjects',
      title: 'Featured projects',
    },
    {
      name: 'media',
      title: 'Latest news',
    },
    {
      name: 'approach',
      title: 'Our approach',
    },
    {
      name: 'getInvolved',
      title: 'Get involved',
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
    defineField({
      name: 'featuredProjectsHeading',
      title: 'Section heading',
      type: 'string',
      group: 'featuredProjects',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured projects',
      type: 'array',
      group: 'featuredProjects',
      description:
        'Optionally select and order up to three projects for the homepage. Leave empty to hide this section.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'project'}],
        }),
      ],
      validation: (rule) =>
        rule.max(3).unique().error('Select no more than three different projects.'),
    }),
    defineField({
      name: 'mediaLabel',
      title: 'Section label',
      type: 'string',
      group: 'media',
      initialValue: 'Media Center',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'mediaHeading',
      title: 'Section heading',
      type: 'string',
      group: 'media',
      initialValue: 'Stories, ideas, and updates from IAHL',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'approachLabel',
      title: 'Section label',
      type: 'string',
      group: 'approach',
      initialValue: 'Our Approach',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'approachHeading',
      title: 'Section heading',
      type: 'string',
      group: 'approach',
      initialValue: 'Five values that shape every research partnership',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'approachValues',
      title: 'Approach values',
      type: 'array',
      group: 'approach',
      description: 'Add and arrange the five values that guide IAHL’s research partnerships.',
      of: [
        defineArrayMember({
          type: 'approachValue',
        }),
      ],
      validation: (rule) =>
        rule.required().length(5).error('Exactly five approach values are required.'),
    }),
    defineField({
      name: 'getInvolvedLabel',
      title: 'Section label',
      type: 'string',
      group: 'getInvolved',
      initialValue: 'Get involved',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'getInvolvedHeading',
      title: 'Section heading',
      type: 'string',
      group: 'getInvolved',
      initialValue: 'Better health research is built together',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'getInvolvedDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'getInvolved',
      initialValue:
        'Work with IAHL to develop responsible, locally relevant research that responds to real health priorities and the people they affect.',
      validation: (rule) => rule.required().max(240),
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
