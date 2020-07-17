import { Any } from '../../../core/schemas'
import { Entity } from '../../Entity'

const Variable = {
  collectionName: 'Variables',
  name: 'Variable',
  schema: Entity.schema.keys({
    value: Any.schema
  })
}

export default Variable
