import { findDocumentById } from 'moltres/db'

import { Upload } from '../schemas'

const findUploadById = findDocumentById(Upload)

export default findUploadById
