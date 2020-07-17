import { deleteEntity } from '../Entity'

import { UserImage } from './schemas'

const deleteUserImage = deleteEntity(UserImage)

export default deleteUserImage
