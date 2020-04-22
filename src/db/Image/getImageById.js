import { Image } from './schemas'
import { getDocumentById } from '../../utils/db'

const getImageById = getDocumentById(Image)

export default getImageById
