import { Entity, Id } from 'moltres/core'

const UserImage = {
  collectionName: 'UserImages',
  indexes: [['userId', 'imageId']],
  name: 'UserImage',
  schema: Entity.schema.keys({
    imageId: Id.schema.required(),
    userId: Id.schema.required()
  })
}

export default UserImage
