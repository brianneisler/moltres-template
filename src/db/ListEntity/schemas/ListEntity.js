import { Id, Index, String } from '../../../core/schemas'
import { Entity } from '../../Entity'

const ListEntity = {
  collectionName: 'ListEntities',
  indexes: [['listId', 'index']],
  name: 'ListEntity',
  schema: Entity.schema.keys({
    entityId: Id.schema.required(),
    entityType: String.schema.required(),
    index: Index.schema.required(),
    listId: Id.schema.required()
  })
}

export default ListEntity
