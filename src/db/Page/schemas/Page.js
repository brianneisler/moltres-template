import { String } from '../../../core/schemas'
import { Entity } from '../../Entity'

const Page = {
  collectionName: 'Pages',
  name: 'Page',
  schema: Entity.schema.keys({
    description: String.schema.required(),
    path: String.schema.required()
  })
}

export default Page
