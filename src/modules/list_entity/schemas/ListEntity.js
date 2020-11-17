import { Entity, Id, IndexInteger, String } from 'moltres/core'

const ListEntity = {
  collectionName: 'ListEntities',
  indexes: [['listId', 'index']],
  name: 'ListEntity',
  schema: Entity.schema.keys({
    entityId: Id.schema.required(),
    entityType: String.schema.required(),
    index: IndexInteger.schema.required(),
    listId: Id.schema.required()
  })
}

export default ListEntity
