import { UserImage } from './schemas'
import { deleteEntity } from '../Entity'

const deleteUserImage = deleteEntity(UserImage)

export default deleteUserImage
