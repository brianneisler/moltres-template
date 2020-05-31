import { Entity } from '../../Entity'
import { String } from '../../../core/schemas'

const Page = {
  collectionName: 'Pages',
  name: 'Page',
  schema: Entity.keys({
    content: String.schema.required(),
    contentFormat: String.schema.allow('markdown').required(),
    description: String.schema.required(),
    : String.schema.required()
  })
}

export default Page
