import DocumentTextIcon from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

export const mediaPage = defineType({
  name: 'mediaPage',
  title: 'Media Center page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      initialValue: 'Media Center',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      initialValue: 'Stories, publications, photographs and videos from IAHL’s work.',
      validation: (rule) => rule.required().max(180),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
