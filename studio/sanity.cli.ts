import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'f46q2zdd',
    dataset: 'production',
  },

  deployment: {
    appId: 'bt0tbz27tlnav239jyljbm9k',
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
