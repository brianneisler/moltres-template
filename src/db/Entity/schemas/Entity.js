import { Id, String, Timestamped } from '../../../core/schemas'

const Entity = Timestamped.keys({
  id: Id.schema,
  removedByEntityId: String.schema.allow(null),
  removedByEntityType: String.schema.valid('ServiceAccount', 'User').allow(null)
})

export default Entity
