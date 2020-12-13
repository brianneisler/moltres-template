import { getDocumentById } from 'moltres/db'

import { Upload } from '../schemas'

const getUploadById = getDocumentById(Upload)

export default getUploadById
