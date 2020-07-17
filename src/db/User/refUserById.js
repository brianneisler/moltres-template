import { refDocumentById } from '../../utils/db'

import { User } from './schemas'

const refUserById = refDocumentById(User)

export default refUserById
