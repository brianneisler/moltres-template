import { Id, Integer, String } from '../../../core/schemas'
import { Entity } from '../../Entity'
import { Queue } from '../../Queue/schemas'

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
