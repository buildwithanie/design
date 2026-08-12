import DocumentTextIcon from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'introduction', title: 'Page introduction', default: true},
    {name: 'identity', title: 'Who we are'},
    {name: 'story', title: 'Our story'},
    {name: 'team', title: 'Our team'},
    {name: 'partners', title: 'Our partners'},
  ],
  fields: [
    defineField({
      name: 'pageHeading',
      title: 'Page heading',
      type: 'string',
      group: 'introduction',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'identityHeading',
      title: 'Section heading',
      type: 'string',
      group: 'identity',
      initialValue: 'Who we are',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'identityStatement',
      title: 'Organization statement',
      type: 'text',
      rows: 3,
      group: 'identity',
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: 'identityDescription',
      title: 'Supporting description',
      type: 'text',
      rows: 3,
      group: 'identity',
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: 'identityImage',
      title: 'Section image',
      type: 'accessibleImage',
      group: 'identity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'storyHeading',
      title: 'Section heading',
      type: 'string',
      group: 'story',
      initialValue: 'Our story',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'storyStatement',
      title: 'Story statement',
      type: 'text',
      rows: 4,
      group: 'story',
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: 'storyDescription',
      title: 'Supporting description',
      type: 'text',
      rows: 3,
      group: 'story',
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: 'teamHeading',
      title: 'Section heading',
      type: 'string',
      group: 'team',
      initialValue: 'The people behind IAHL’s research',
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team members',
      type: 'array',
      group: 'team',
      description: 'Select and arrange the people displayed on the About page.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'teamMember'}],
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'partnersHeading',
      title: 'Section heading',
      type: 'string',
      group: 'partners',
      initialValue: 'Our partners',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      group: 'partners',
      description: 'Select and arrange the partner logos displayed on the About page.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'partner'}],
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About page',
        subtitle: 'Organization, story, team, and partners',
      }
    },
  },
})
