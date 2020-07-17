import { findDocumentById } from '../../utils/db'

import { User } from './schemas'

const findUserById = findDocumentById(User)

export default findUserById
