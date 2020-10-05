import { findDocumentById } from '../../../utils/db'
import { File } from '../schemas'

const findFileById = findDocumentById(File)

export default findFileById
