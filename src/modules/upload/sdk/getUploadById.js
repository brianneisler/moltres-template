import { getDocumentById } from '../../../utils/db'
import { Upload } from '../schemas'

const getUploadById = getDocumentById(Upload)

export default getUploadById
