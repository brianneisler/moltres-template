import { PageContentFormat } from '../../../constants'
import {
  Boolean,
  Entity,
  Id,
  Integer,
  String,
  Timestamp
} from 'moltres/core'
import { values } from 'moltres/lang'
import { Page } from '../../page/schemas'

const PageContent = {
  collectionName: 'PageContents',
  indexes: [['pageId', 'version']],
  name: 'PageContent',
  parentRefIdField: 'pageId',
  parentSchema: Page,
  schema: Entity.schema.keys({
    content: String.schema.required(),
    format: String.schema.allow(...values(PageContentFormat)).required(),
    pageId: Id.schema.required(),
    published: Boolean.schema.required(),
    publishedAt: Timestamp.schema,
    version: Integer.schema.required()
  })
}

export default PageContent
