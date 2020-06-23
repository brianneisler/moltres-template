import { Entity } from '../../Entity'
import { String } from '../../../core/schemas'

const Page = {
  collectionName: 'Pages',
  name: 'Page',
  schema: Entity.schema.keys({
    description: String.schema.required(),
    path: String.schema.required()
  })
}

export default Page
