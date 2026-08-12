import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'f46q2zdd',
    dataset: 'production',
  },

  deployment: {
    autoUpdates: true,
  },

  schemaExtraction: {
    enabled: true,
    path: 'schema.json',
    enforceRequiredFields: true,
  },

  typegen: {
    enabled: true,
    path: '../web/sanity/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../web/sanity.types.ts',
    overloadClientMethods: true,
  },
})
