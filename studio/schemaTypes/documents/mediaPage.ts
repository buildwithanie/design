import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

export const mediaPage = defineType({
  name: 'mediaPage',
  title: 'Media Center page',
  type: 'document',
  icon: DocumentTextIcon,

  fields: [
    defineField({
      name: 'introLabel',
      title: 'Introduction label',
      type: 'string',
      initialValue: 'Media Center',
      validation: (rule) => rule.required().max(60),
    }),

    defineField({
      name: 'introHeading',
      title: 'Introduction heading',
      type: 'string',
      initialValue: 'Research, field learning, and ideas worth sharing.',
      validation: (rule) => rule.required().max(120),
    }),

    defineField({
      name: 'introDescription',
      title: 'Introduction description',
      type: 'text',
      rows: 3,
      initialValue:
        'Follow IAHL’s research, community conversations, partnerships, and practical lessons from work across health and technology.',
      validation: (rule) => rule.required().max(280),
    }),

    defineField({
      name: 'featuredNews',
      title: 'Featured story',
      type: 'reference',
      description: 'Select the IAHL article displayed prominently at the top of the Media Center.',

      to: [{type: 'newsItem'}],

      options: {
        filter: 'destination == "internal"',
      },

      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'newsSectionLabel',
      title: 'News section label',
      type: 'string',
      initialValue: 'Latest from IAHL',
      validation: (rule) => rule.required().max(60),
    }),

    defineField({
      name: 'newsSectionHeading',
      title: 'News section heading',
      type: 'string',
      initialValue: 'Updates from the work, not just announcements.',
      validation: (rule) => rule.required().max(120),
    }),

    defineField({
      name: 'newsArchiveLabel',
      title: 'News archive label',
      type: 'string',
      initialValue: 'News and insights',
      validation: (rule) => rule.required().max(60),
    }),

    defineField({
      name: 'newsArchiveHeading',
      title: 'News archive heading',
      type: 'string',
      initialValue: 'Stories and learning from across IAHL’s work.',
      validation: (rule) => rule.required().max(120),
    }),

    defineField({
      name: 'newsArchiveDescription',
      title: 'News archive description',
      type: 'text',
      rows: 3,
      initialValue:
        'Research insights, field stories, partnership updates, and news from the people and questions shaping IAHL’s work.',
      validation: (rule) => rule.required().max(280),
    }),

    defineField({
      name: 'publicationsSectionLabel',
      title: 'Publications section label',
      type: 'string',
      initialValue: 'Publications and resources',
      validation: (rule) => rule.required().max(60),
    }),

    defineField({
      name: 'publicationsSectionHeading',
      title: 'Publications section heading',
      type: 'string',
      initialValue: 'Reports, briefs, and practical resources.',
      validation: (rule) => rule.required().max(120),
    }),

    defineField({
      name: 'publicationsArchiveLabel',
      title: 'Publications archive label',
      type: 'string',
      initialValue: 'Publications and resources',
      validation: (rule) => rule.required().max(60),
    }),

    defineField({
      name: 'publicationsArchiveHeading',
      title: 'Publications archive heading',
      type: 'string',
      initialValue: 'Evidence and practical resources for use beyond IAHL.',
      validation: (rule) => rule.required().max(120),
    }),

    defineField({
      name: 'publicationsArchiveDescription',
      title: 'Publications archive description',
      type: 'text',
      rows: 3,
      initialValue:
        'Access research briefs, practice notes, guides, and learning materials produced through IAHL’s work.',
      validation: (rule) => rule.required().max(280),
    }),

    defineField({
      name: 'multimediaSectionLabel',
      title: 'Multimedia section label',
      type: 'string',
      initialValue: 'Photos and video',
      validation: (rule) => rule.required().max(60),
    }),

    defineField({
      name: 'multimediaSectionHeading',
      title: 'Multimedia section heading',
      type: 'string',
      initialValue: 'IAHL’s work, seen from closer.',
      validation: (rule) => rule.required().max(120),
    }),

    defineField({
      name: 'multimediaSectionDescription',
      title: 'Multimedia section description',
      type: 'text',
      rows: 2,
      initialValue:
        'Selected moments from community conversations, research, partnership, and learning.',
      validation: (rule) => rule.required().max(220),
    }),

    defineField({
      name: 'multimediaArchiveLabel',
      title: 'Multimedia archive label',
      type: 'string',
      initialValue: 'Photos and video',
      validation: (rule) => rule.required().max(60),
    }),

    defineField({
      name: 'multimediaArchiveHeading',
      title: 'Multimedia archive heading',
      type: 'string',
      initialValue: 'Research and partnership, seen from closer.',
      validation: (rule) => rule.required().max(120),
    }),

    defineField({
      name: 'multimediaArchiveDescription',
      title: 'Multimedia archive description',
      type: 'text',
      rows: 3,
      initialValue:
        'Explore galleries and videos from community conversations, research activities, and shared learning.',
      validation: (rule) => rule.required().max(280),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Media Center page',
      }
    },
  },
})
