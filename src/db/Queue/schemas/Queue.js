import { Id, String } from '../../../core/schemas'
import { Entity } from '../../Entity'

const Queue = {
  collectionName: 'Queues',
  name: 'Queue',
  schema: Entity.schema.keys({
    parentEntityId: Id.schema.allow(null),
    parentEntityType: String.schema.allow(null)
  })
}

export default Queue
