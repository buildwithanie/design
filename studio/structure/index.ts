import {HomeIcon} from '@sanity/icons/Home'
import type {StructureResolver} from 'sanity/structure'

const singletonTypes = new Set(['homePage'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website content')
    .items([
      S.listItem()
        .title('Home page')
        .icon(HomeIcon)
        .child(S.document().title('Home page').schemaType('homePage').documentId('homePage')),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() ?? ''),
      ),
    ])
