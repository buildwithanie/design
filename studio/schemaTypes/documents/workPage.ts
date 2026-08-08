import DocumentTextIcon from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const workPage = defineType({
  name: 'workPage',
  title: 'Our Work page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'introduction', title: 'Introduction', default: true},
    {name: 'areas', title: 'Areas of work'},
    {name: 'impact', title: 'Impact'},
    {name: 'project', title: 'Featured project'},
  ],
  fields: [
    defineField({
      name: 'introLabel',
      title: 'Intro label',
      type: 'string',
      group: 'introduction',
      validation: (rule) => rule.required().max(50),
    }),
    defineField({
      name: 'introHeading',
      title: 'Page heading',
      type: 'string',
      group: 'introduction',
      validation: (rule) => rule.required().max(110),
    }),
    defineField({
      name: 'workAreas',
      title: 'Areas of work',
      type: 'array',
      group: 'areas',
      description:
        'Select the areas to introduce on this page and arrange them in the order they should be read.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'areaOfWork'}]})],
      validation: (rule) =>
        rule.required().min(1).max(3).unique().error('Select between one and three different areas.'),
    }),
    defineField({
      name: 'impactHeading',
      title: 'Impact heading',
      type: 'string',
      group: 'impact',
      initialValue: 'Impact at a glance',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'impactMetrics',
      title: 'Impact metrics',
      type: 'array',
      group: 'impact',
      description: 'Add only figures that IAHL can verify. Leave this empty to hide the section.',
      of: [defineArrayMember({type: 'impactMetric'})],
      validation: (rule) => rule.max(4).error('Add no more than four impact metrics.'),
    }),
    defineField({
      name: 'featuredProject',
      title: 'Featured project',
      type: 'reference',
      group: 'project',
      description: 'Optional project that demonstrates this work in practice.',
      to: [{type: 'project'}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Our Work page',
        subtitle: 'Areas, impact and featured project',
      }
    },
  },
})
