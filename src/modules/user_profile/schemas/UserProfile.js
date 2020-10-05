import { Entity, Id, String } from '../../../core/schemas'

const UserProfile = {
  collectionName: 'UserProfiles',
  idField: 'userId',
  name: 'UserProfile',
  schema: Entity.schema.keys({
    bio: String.schema,
    location: String.schema,
    name: String.schema.required(),
    userId: Id.schema.required(),
    userProfileImageId: Id.schema,
    website: String.schema
  })
}

export default UserProfile
