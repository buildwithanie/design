import { ImageIcon } from '@sanity/icons/Image';
import {defineField, defineType} from 'sanity'

export const accessibleImage = defineType({
  name: 'accessibleImage',
  title: 'Image',
  type: 'image',
  icon: ImageIcon,
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'decorative',
      title: 'Decorative image',
      type: 'boolean',
      description: 'Enable this when the image adds no information beyond the surrounding text.',
      initialValue: false,
    }),
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the image for visitors using screen readers.',
      hidden: ({parent}) => Boolean(parent?.decorative),
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {decorative?: boolean} | undefined

          if (parent?.decorative || value?.trim()) {
            return true
          }

          return 'Alternative text is required unless the image is decorative.'
        }),
    }),
  ],
})
