import { deleteEntity } from 'moltres/core'
import { UserProfileImage } from '../schemas'

const deleteUserProfileImage = deleteEntity(UserProfileImage)

export default deleteUserProfileImage
