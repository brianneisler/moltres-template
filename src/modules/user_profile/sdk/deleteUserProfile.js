import { deleteEntity } from '../../../core/sdk'
import { UserProfile } from '../schemas'

const deleteUserProfile = deleteEntity(UserProfile)

export default deleteUserProfile
