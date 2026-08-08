import BarChartIcon from '@sanity/icons/BarChart'
import {defineField, defineType} from 'sanity'

export const impactMetric = defineType({
  name: 'impactMetric',
  title: 'Impact metric',
  type: 'object',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Use a verified figure, including any necessary symbol, such as 24 or 1,200+.',
      validation: (rule) => rule.required().max(20),
    }),
    defineField({
      name: 'label',
      title: 'Description',
      type: 'string',
      description: 'Explain clearly what the figure measures.',
      validation: (rule) => rule.required().max(100),
    }),
  ],
  preview: {
    select: {
      title: 'value',
      subtitle: 'label',
    },
  },
})
