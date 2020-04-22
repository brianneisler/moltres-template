import { Upload } from './schemas'
import { getDocumentById } from '../../utils/db'

const getUploadById = getDocumentById(Upload)

export default getUploadById
