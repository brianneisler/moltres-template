import { deleteEntity } from '../Entity'

import { UserProfileImage } from './schemas'

const deleteUserProfileImage = deleteEntity(UserProfileImage)

export default deleteUserProfileImage
