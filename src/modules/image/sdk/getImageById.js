import { getDocumentById } from 'moltres/db'
import { Image } from '../schemas'

const getImageById = getDocumentById(Image)

export default getImageById
