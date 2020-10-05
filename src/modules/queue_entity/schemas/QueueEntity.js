import { Entity, Id, Integer, String } from '../../../core/schemas'
import { Queue } from '../../queue/schemas'

const QueueEntity = {
  collectionName: 'QueueEntities',
  idField: 'index',
  name: 'QueueEntity',
  parentRefIdField: 'queueId',
  parentSchema: Queue,
  schema: Entity.schema.keys({
    entityId: Id.schema.required(),
    entityType: String.schema.required(),
    index: Integer.schema.required(),
    queueId: Id.schema.required()
  })
}

export default QueueEntity
