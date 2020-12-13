import { refDocumentById } from 'moltres/db'
import { File } from '../schemas'

const refFileById = refDocumentById(File)

export default refFileById
