import { Entity } from '../../Entity'
import { PageContentFormat } from '../../../constants'
import { String } from '../../../core/schemas'
import { values } from '../../../utils/lang'

const PageContent = {
  collectionName: 'PageContents',
  name: 'PageContent',
  schema: Entity.schema.keys({
    content: String.schema.required(),
    format: String.schema.allow(...values(PageContentFormat)).required()
  })
}

export default PageContent
