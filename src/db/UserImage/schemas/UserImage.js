import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'

const UserImage = {
  collectionName: 'UserImages',
  indexes: [['userId', 'imageId']],
  name: 'UserImage',
  schema: Entity.keys({
    imageId: id().required(),
    userId: id().required()
  })
}

export default UserImage
