import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

export const contentImage = defineType({
  name: 'contentImage',
  title: 'Content image',
  type: 'image',
  icon: ImageIcon,

  options: {
    hotspot: true,
  },

  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the important information shown in the image.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional context displayed underneath the image.',
      validation: (rule) => rule.max(180),
    }),

    defineField({
      name: 'credit',
      title: 'Image credit',
      type: 'string',
      description: 'Optional photographer, organization, or image-source credit.',
      validation: (rule) => rule.max(120),
    }),
  ],

  preview: {
    select: {
      title: 'caption',
      subtitle: 'credit',
      media: 'asset',
    },

    prepare({title, subtitle, media}) {
      return {
        title: title || 'Content image',
        subtitle,
        media,
      }
    },
  },
})
