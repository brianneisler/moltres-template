import { UserProfile } from './schemas'
import { removeEntity } from '../Entity'

const removeUserProfile = removeEntity(UserProfile)

export default removeUserProfile
