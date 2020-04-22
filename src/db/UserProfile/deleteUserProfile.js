import { UserProfile } from './schemas'
import { deleteEntity } from '../Entity'

const deleteUserProfile = deleteEntity(UserProfile)

export default deleteUserProfile
