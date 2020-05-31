import { Id, String } from '../../../core/schemas'
import { Timestamped } from '../../Timestamped'

const Entity = Timestamped.keys({
  id: Id.schema,
  removedByEntityId: String.schema.allow(null),
  removedByEntityType: String.schema.valid('ServiceAccount', 'User').allow(null)
})

export default Entity
