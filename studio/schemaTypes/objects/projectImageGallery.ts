import { ImagesIcon } from '@sanity/icons/Images';
import {defineArrayMember, defineField, defineType} from 'sanity'

export const projectImageGallery = defineType({
  name: 'projectImageGallery',
  title: 'Image gallery',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Add between two and four related images. Drag them to control their order.',

      of: [
        defineArrayMember({
          name: 'galleryImage',
          title: 'Image',
          type: 'image',

          options: {
            hotspot: true,
          },

          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              description: 'Describe the important information shown in this image.',
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional context displayed underneath this image.',
              validation: (rule) => rule.max(180),
            }),

            defineField({
              name: 'credit',
              title: 'Image credit',
              type: 'string',
              description: 'Optional photographer, organization or image-source credit.',
              validation: (rule) => rule.max(120),
            }),
          ],
        }),
      ],

      validation: (rule) => rule.required().min(2).max(4).error('Add between two and four images.'),
    }),
  ],

  preview: {
    select: {
      media: 'images.0',
    },

    prepare({media}) {
      return {
        title: 'Image gallery',
        subtitle: 'Two to four related images',
        media,
      }
    },
  },
})
