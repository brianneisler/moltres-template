import { Entity } from '../../Entity'
import { Id, Integer, String, Timestamp } from '../../../core/schemas'
import { Page } from '../../Page/schemas'
import { PageContentFormat } from '../../../constants'
import { values } from '../../../utils/lang'

const PageContent = {
  collectionName: 'PageContents',
  indexes: [['pageId', 'version']],
  name: 'PageContent',
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
