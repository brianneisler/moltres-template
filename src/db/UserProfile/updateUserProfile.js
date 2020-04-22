import { UserProfile } from './schemas'
import { updateEntity } from '../Entity'

const updateUserProfile = updateEntity(UserProfile)

export default updateUserProfile
