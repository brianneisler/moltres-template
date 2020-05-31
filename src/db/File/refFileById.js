import { File } from './schemas'
import { refDocumentById } from '../../utils/db'

const refFileById = refDocumentById(File)

export default refFileById
