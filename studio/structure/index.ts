import DocumentTextIcon from '@sanity/icons/DocumentText'
import CogIcon from '@sanity/icons/Cog'
import {HomeIcon} from '@sanity/icons/Home'
import {ImagesIcon} from '@sanity/icons/Images'
import {TagIcon} from '@sanity/icons/Tag'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website content')
    .items([
      S.listItem()
        .title('Home page')
        .icon(HomeIcon)
        .child(S.document().title('Home page').schemaType('homePage').documentId('homePage')),

      S.listItem()
        .title('Projects page')
        .icon(DocumentTextIcon)
        .child(
          S.document().title('Projects page').schemaType('projectsPage').documentId('projectsPage'),
        ),

      S.listItem()
        .title('Our Work page')
        .icon(DocumentTextIcon)
        .child(S.document().title('Our Work page').schemaType('workPage').documentId('workPage')),

      S.listItem()
        .title('Get involved page')
        .icon(DocumentTextIcon)
        .child(
          S.document()
            .title('Get involved page')
            .schemaType('getInvolvedPage')
            .documentId('getInvolvedPage'),
        ),

      S.listItem()
        .title('Media Center')
        .icon(ImagesIcon)
        .child(
          S.list()
            .title('Media Center')
            .items([
              S.listItem()
                .title('Media Center page')
                .icon(DocumentTextIcon)
                .child(
                  S.document()
                    .title('Media Center page')
                    .schemaType('mediaPage')
                    .documentId('mediaPage'),
                ),

              S.divider(),

              S.documentTypeListItem('newsItem').title('News and insights').icon(DocumentTextIcon),

              S.documentTypeListItem('publication').title('Publications').icon(DocumentTextIcon),

              S.divider(),

              S.documentTypeListItem('multimediaItem')
                .title('Galleries and videos')
                .icon(ImagesIcon),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Organization details')
        .icon(CogIcon)
        .child(
          S.document()
            .title('Organization details')
            .schemaType('organizationDetails')
            .documentId('organizationDetails'),
        ),

      S.divider(),

      S.documentTypeListItem('project').title('Projects').icon(DocumentTextIcon),

      S.documentTypeListItem('areaOfWork').title('Areas of work').icon(TagIcon),
    ])
