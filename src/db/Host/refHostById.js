import { refDocumentById } from '../../utils/db'

import { Host } from './schemas'

const refHostById = refDocumentById(Host)

export default refHostById
