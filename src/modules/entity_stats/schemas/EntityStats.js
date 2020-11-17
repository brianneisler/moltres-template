import { Entity, Id, Integer, String } from 'moltres/core'

const EntityStats = {
  collectionName: 'EntityStats',
  indexes: [['entityType', 'entityId']],
  name: 'EntityStats',
  schema: Entity.schema.keys({
    entityId: Id.schema.required(),
    entityType: String.schema.required(),
    numberShards: Integer.schema.required()
  })
}

export default EntityStats
