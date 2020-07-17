import { File } from './schemas'
import { findDocumentById } from '../../utils/db'

const findFileById = findDocumentById(File)

export default findFileById
