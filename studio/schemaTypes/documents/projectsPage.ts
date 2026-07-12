import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Projects page',
  type: 'document',
  icon: DocumentTextIcon,

  groups: [
    {
      name: 'introduction',
      title: 'Introduction',
      default: true,
    },
    {
      name: 'callToAction',
      title: 'Call to action',
    },
  ],

  fields: [
    defineField({
      name: 'introLabel',
      title: 'Intro label',
      type: 'string',
      group: 'introduction',
      description: 'The short label displayed above the page heading.',
      validation: (rule) => rule.required().max(50),
    }),

    defineField({
      name: 'introHeading',
      title: 'Page heading',
      type: 'string',
      group: 'introduction',
      validation: (rule) => rule.required().max(100),
    }),

    defineField({
      name: 'introDescription',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      group: 'introduction',
      validation: (rule) => rule.required().max(240),
    }),

    defineField({
      name: 'ctaLabel',
      title: 'Call-to-action label',
      type: 'string',
      group: 'callToAction',
      validation: (rule) => rule.required().max(50),
    }),

    defineField({
      name: 'ctaHeading',
      title: 'Call-to-action heading',
      type: 'string',
      group: 'callToAction',
      validation: (rule) => rule.required().max(160),
    }),

    defineField({
      name: 'ctaLinkLabel',
      title: 'Link label',
      type: 'string',
      group: 'callToAction',
      description: 'Text displayed on the link. Its destination remains controlled by the website.',
      validation: (rule) => rule.required().max(50),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Projects page',
        subtitle: 'Projects landing page',
      }
    },
  },
})
