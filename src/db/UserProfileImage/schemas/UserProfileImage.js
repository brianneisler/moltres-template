import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'

// NOTE: These are used to track all user profile images the user has added. In
// the event the user changes their profile image, this maintains a record of which
// image was used by what user.
const UserProfileImage = {
  collectionName: 'UserProfileImages',
  indexes: [['userId', 'imageId']],
  name: 'UserProfileImage',
  schema: Entity.keys({
    imageId: id().required(),
    userId: id().required()
  })
}

export default UserProfileImage
