import { Any, Entity } from 'moltres/core'

const Variable = {
  collectionName: 'Variables',
  name: 'Variable',
  schema: Entity.schema.keys({
    value: Any.schema
  })
}

export default Variable
