import { Entity, Id, String } from 'moltres/core'

const List = {
  collectionName: 'Lists',
  name: 'List',
  schema: Entity.schema.keys({
    parentEntityId: Id.schema.allow(null),
    parentEntityType: String.schema.allow(null)
  })
}

export default List
