import { Any, Entity } from '../../../core/schemas'

const Variable = {
  collectionName: 'Variables',
  name: 'Variable',
  schema: Entity.schema.keys({
    value: Any.schema
  })
}

export default Variable
