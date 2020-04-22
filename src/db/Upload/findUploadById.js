import { Upload } from './schemas'
import { findDocumentById } from '../../utils/db'

const findUploadById = findDocumentById(Upload)

export default findUploadById
