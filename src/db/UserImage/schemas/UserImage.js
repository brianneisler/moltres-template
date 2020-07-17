import { Entity } from '../../Entity'
import { Id } from '../../../core/schemas'

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
