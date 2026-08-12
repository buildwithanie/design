import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Projects page',
  type: 'document',
  icon: DocumentTextIcon,

  fields: [
    defineField({
      name: 'introLabel',
      title: 'Intro label',
      type: 'string',
      description: 'The short label displayed above the page heading.',
      validation: (rule) => rule.required().max(50),
    }),

    defineField({
      name: 'introHeading',
      title: 'Page heading',
      type: 'string',
      validation: (rule) => rule.required().max(100),
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
