import { getDocumentById } from '../../utils/db'

import { Image } from './schemas'

const getImageById = getDocumentById(Image)

export default getImageById
