import { Entity } from '../../Entity'
import { String } from '../../../core/schemas'

const PageContent = {
  collectionName: 'PageContents',
  name: 'PageContent',
  schema: Entity.keys({
    content: String.schema.required(),
    format: String.schema.allow('markdown').required()
  })
}

export default PageContent
