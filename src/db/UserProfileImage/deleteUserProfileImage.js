import { UserProfileImage } from './schemas'
import { deleteEntity } from '../Entity'

const deleteUserProfileImage = deleteEntity(UserProfileImage)

export default deleteUserProfileImage
