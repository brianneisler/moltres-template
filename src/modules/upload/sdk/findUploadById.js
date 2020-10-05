import { findDocumentById } from '../../../utils/db'
import { Upload } from '../schemas'

const findUploadById = findDocumentById(Upload)

export default findUploadById
