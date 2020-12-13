import { getDocumentById } from 'moltres/db'
import { File } from '../schemas'

const getFileById = getDocumentById(File)

export default getFileById
