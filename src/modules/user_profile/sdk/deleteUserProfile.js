import { deleteEntity } from 'moltres/core'

import { UserProfile } from '../schemas'

const deleteUserProfile = deleteEntity(UserProfile)

export default deleteUserProfile
