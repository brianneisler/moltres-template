import {
  Entity,
  Id,
  IndexInteger,
  PositiveInteger,
  String
} from '../../../core/schemas'

const Queue = {
  collectionName: 'Queues',
  name: 'Queue',
  schema: Entity.schema.keys({
    headIndex: IndexInteger.schema.required(),
    length: PositiveInteger.schema.allow(0).required(),
    parentEntityId: Id.schema.allow(null),
    parentEntityType: String.schema.allow(null),
    tailIndex: IndexInteger.schema.allow(-1).required()
  })
}

export default Queue
