import { Id, Number, String } from '../../../core/schemas'
import { Entity } from '../../Entity'

const _Url = {
  collectionName: 'Urls',
  name: 'Url',
  schema: Entity.schema.keys({
    hash: String.schema.allow(null).required(),
    hostId: Id.schema.required(),
    pathname: String.schema.required(),
    port: Number.schema.allow(null).required(),
    protocol: String.schema.required(),
    search: String.schema.allow(null).required()
  })
}

export default _Url
