import { Id, Index, PositiveInteger, String } from '../../../core/schemas'
import { Entity } from '../../Entity'

const Queue = {
  collectionName: 'Queues',
  name: 'Queue',
  schema: Entity.schema.keys({
    headIndex: Index.schema.required(),
    length: PositiveInteger.schema.allow(0).required(),
    parentEntityId: Id.schema.allow(null),
    parentEntityType: String.schema.allow(null),
    tailIndex: Index.schema.allow(-1).required()
  })
}

export default Queue
