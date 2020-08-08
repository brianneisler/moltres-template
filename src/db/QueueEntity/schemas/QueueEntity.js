import { Id, Integer, String } from '../../../core/schemas'
import { Entity } from '../../Entity'

const QueueEntity = {
  collectionName: 'QueueEntities',
  indexes: [['queueId', 'order']],
  name: 'QueueEntity',
  schema: Entity.schema.keys({
    entityId: Id.schema.required(),
    entityType: String.schema.required(),
    order: Integer.schema.required(),
    queueId: Id.schema.required()
  })
}

export default QueueEntity
