import { Entity, String } from 'moltres/core'

const Error = {
  collectionName: 'Errors',
  name: 'Error',
  schema: Entity.schema.keys({
    code: String.schema.allow(null).required(),
    message: String.schema.required(),
    source: String.schema.required(),
    stack: String.schema.required()
  })
}

export default Error
