import { findDocumentById } from 'moltres/db'
import { File } from '../schemas'

const findFileById = findDocumentById(File)

export default findFileById
