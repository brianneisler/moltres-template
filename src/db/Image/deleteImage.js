import { deleteEntity } from '../Entity'

import { Image } from './schemas'

const deleteImage = deleteEntity(Image)

export default deleteImage
