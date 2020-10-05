import { deleteEntity } from '../../../core/sdk'
import { Image } from '../schemas'

const deleteImage = deleteEntity(Image)

export default deleteImage
