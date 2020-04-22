import { Upload } from './schemas'
import { refDocumentById } from '../../utils/db'

const refUploadById = refDocumentById(Upload)

export default refUploadById
