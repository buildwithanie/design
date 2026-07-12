import {BlockContentIcon} from '@sanity/icons/BlockContent'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const portableContent = defineType({
  name: 'portableContent',
  title: 'Rich content',
  type: 'array',
  icon: BlockContentIcon,

  of: [
    defineArrayMember({
      type: 'block',

      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Section heading', value: 'h2'},
        {title: 'Subheading', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],

      lists: [
        {title: 'Bullet list', value: 'bullet'},
        {title: 'Numbered list', value: 'number'},
      ],

      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],

        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Link',
            type: 'object',

            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',

                validation: (rule) =>
                  rule.required().uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              }),

              defineField({
                name: 'openInNewTab',
                title: 'Open in a new tab',
                type: 'boolean',
                description: 'Use this for external websites and downloadable resources.',
                initialValue: false,
              }),
            ],
          }),
        ],
      },
    }),

    defineArrayMember({
      type: 'contentImage',
    }),

    defineArrayMember({
      type: 'contentImageGallery',
    }),
  ],
})
