import { Entity, Id } from 'moltres/core'

// NOTE: These are used to track all user profile images the user has added. In
// the event the user changes their profile image, this maintains a record of which
// image was used by what user.
const UserProfileImage = {
  collectionName: 'UserProfileImages',
  indexes: [['userId', 'imageId']],
  name: 'UserProfileImage',
  schema: Entity.schema.keys({
    imageId: Id.schema.required(),
    userId: Id.schema.required()
  })
}

export default UserProfileImage
