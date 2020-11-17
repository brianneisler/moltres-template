import { deleteEntity } from 'moltres/core'
import { Image } from '../schemas'

const deleteImage = deleteEntity(Image)

export default deleteImage
