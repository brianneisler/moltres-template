import { String } from '../../../core/schemas'
import { Entity } from '../../Entity'

const Host = {
  collectionName: 'Hosts',
  name: 'Host',
  schema: Entity.schema.keys({
    domain: String.schema.required(),
    subDomain: String.schema.allow(null).required(),
    topLevelDomain: String.schema.required()
  })
}

export default Host
