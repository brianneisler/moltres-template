import { Entity } from '../../Entity'
import { Id, Integer, String } from '../../../core/schemas'

const EntityStats = {
  collectionName: 'EntityStats',
  indexes: [['entityType', 'entityId']],
  name: 'EntityStats',
  schema: Entity.keys({
    entityId: Id.schema.required(),
    entityType: String.schema.required(),
    numberShards: Integer.schema.required()
  })
}

export default EntityStats
