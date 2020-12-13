import { refDocumentById } from 'moltres/db'

import { Upload } from '../schemas'

const refUploadById = refDocumentById(Upload)

export default refUploadById
