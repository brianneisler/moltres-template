import { deleteEntity } from 'moltres/core'
import { UserImage } from '../schemas'

const deleteUserImage = deleteEntity(UserImage)

export default deleteUserImage
