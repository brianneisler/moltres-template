import { refDocumentById } from '../../utils/db'

import { Upload } from './schemas'

const refUploadById = refDocumentById(Upload)

export default refUploadById
