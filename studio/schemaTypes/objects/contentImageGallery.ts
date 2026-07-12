import {ImagesIcon} from '@sanity/icons/Images'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const contentImageGallery = defineType({
  name: 'contentImageGallery',
  title: 'Image gallery',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description:
        'Add between two and six related images. Drag the images to control their order.',

      of: [
        defineArrayMember({
          type: 'contentImage',
        }),
      ],

      validation: (rule) => rule.required().min(2).max(6).error('Add between two and six images.'),
    }),
  ],

  preview: {
    select: {
      firstImage: 'images.0',
      secondImage: 'images.1',
      thirdImage: 'images.2',
      fourthImage: 'images.3',
      fifthImage: 'images.4',
      sixthImage: 'images.5',
    },

    prepare({firstImage, secondImage, thirdImage, fourthImage, fifthImage, sixthImage}) {
      const images = [firstImage, secondImage, thirdImage, fourthImage, fifthImage, sixthImage]

      const count = images.filter(Boolean).length

      return {
        title: 'Image gallery',
        subtitle: `${count} ${count === 1 ? 'image' : 'images'}`,
        media: firstImage,
      }
    },
  },
})
