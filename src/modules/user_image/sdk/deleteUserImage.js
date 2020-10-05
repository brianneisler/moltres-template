import { deleteEntity } from '../../../core/sdk'
import { UserImage } from '../schemas'

const deleteUserImage = deleteEntity(UserImage)

export default deleteUserImage
