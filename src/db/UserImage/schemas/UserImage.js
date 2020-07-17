import { Id } from '../../../core/schemas'
import { Entity } from '../../Entity'

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
