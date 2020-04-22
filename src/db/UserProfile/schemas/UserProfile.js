import { Entity } from '../../Entity'
import { id } from '../../../utils/schema'
import Joi from '@hapi/joi'

const UserProfile = {
  collectionName: 'UserProfiles',
  idField: 'userId',
  name: 'UserProfile',
  schema: Entity.keys({
    bio: Joi.string(),
    location: Joi.string(),
    name: Joi.string().required(),
    userId: id().required(),
    userProfileImageId: id(),
    website: Joi.string()
  })
}

export default UserProfile
