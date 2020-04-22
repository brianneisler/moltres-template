import { Image } from './schemas'
import { deleteEntity } from '../Entity'

const deleteImage = deleteEntity(Image)

export default deleteImage
