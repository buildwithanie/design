import DocumentTextIcon from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const getInvolvedPage = defineType({
  name: 'getInvolvedPage',
  title: 'Get involved page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'introduction', title: 'Introduction', default: true},
    {name: 'partnerships', title: 'Ways to work together'},
    {name: 'inquiry', title: 'Contact introduction'},
  ],
  fields: [
    defineField({
      name: 'introLabel',
      title: 'Intro label',
      type: 'string',
      group: 'introduction',
      initialValue: 'Get involved',
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: 'introHeading',
      title: 'Page heading',
      type: 'string',
      group: 'introduction',
      initialValue: 'Work with IAHL.',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'introDescription',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      group: 'introduction',
      initialValue:
        'We collaborate with communities, researchers, institutions and funders to develop responsible health research.',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'partnershipsLabel',
      title: 'Section label',
      type: 'string',
      group: 'partnerships',
      initialValue: 'Ways to work together',
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: 'partnershipsHeading',
      title: 'Section heading',
      type: 'string',
      group: 'partnerships',
      initialValue: 'Partnership can take different forms.',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'partnershipPaths',
      title: 'Partnership paths',
      type: 'array',
      group: 'partnerships',
      description: 'Add and arrange the ways people and organizations can work with IAHL.',
      of: [defineArrayMember({type: 'partnershipPath'})],
      initialValue: [
        {
          _key: 'research-collaboration',
          _type: 'partnershipPath',
          title: 'Research collaboration',
          description: 'Develop research around shared health questions and priorities.',
        },
        {
          _key: 'community-partnerships',
          _type: 'partnershipPath',
          title: 'Community partnerships',
          description: 'Shape research with the people and systems it is intended to serve.',
        },
        {
          _key: 'institutional-support',
          _type: 'partnershipPath',
          title: 'Institutional support',
          description: 'Strengthen research programmes, capacity and long-term development.',
        },
      ],
      validation: (rule) => rule.required().min(1).max(6),
    }),
    defineField({
      name: 'inquiryLabel',
      title: 'Contact label',
      type: 'string',
      group: 'inquiry',
      initialValue: 'Contact IAHL',
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: 'inquiryHeading',
      title: 'Contact heading',
      type: 'string',
      group: 'inquiry',
      initialValue: 'Start a conversation.',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'inquiryDescription',
      title: 'Contact description',
      type: 'text',
      rows: 3,
      group: 'inquiry',
      initialValue: 'Contact us about a research question, partnership or opportunity to work together.',
      validation: (rule) => rule.required().max(240),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Get involved page',
        subtitle: 'Partnership and contact page',
      }
    },
  },
})
