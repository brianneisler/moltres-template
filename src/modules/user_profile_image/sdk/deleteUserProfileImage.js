import { deleteEntity } from '../../../core/sdk'
import { UserProfileImage } from '../schemas'

const deleteUserProfileImage = deleteEntity(UserProfileImage)

export default deleteUserProfileImage
