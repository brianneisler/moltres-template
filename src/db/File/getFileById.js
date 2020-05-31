import { File } from './schemas'
import { getDocumentById } from '../../utils/db'

const getFileById = getDocumentById(File)

export default getFileById
