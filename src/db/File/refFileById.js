import { refDocumentById } from '../../utils/db'

import { File } from './schemas'

const refFileById = refDocumentById(File)

export default refFileById
