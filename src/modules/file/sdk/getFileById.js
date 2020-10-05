import { getDocumentById } from '../../../utils/db'
import { File } from '../schemas'

const getFileById = getDocumentById(File)

export default getFileById
