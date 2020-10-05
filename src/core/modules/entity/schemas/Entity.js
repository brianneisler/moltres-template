import { Id, String, Timestamped } from '../../core/schemas'

const Entity = {
  name: 'core.Entity',
  schema: Timestamped.schema.keys({
    id: Id.schema,
    removedByEntityId: String.schema.allow(null),
    removedByEntityType: String.schema
      .valid('ServiceAccount', 'User')
      .allow(null)
  })
}

export default Entity
