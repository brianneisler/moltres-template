import { deleteEntity } from '../Entity'

import { UserProfile } from './schemas'

const deleteUserProfile = deleteEntity(UserProfile)

export default deleteUserProfile
