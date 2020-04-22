import { User } from './schemas'
import { findDocumentById } from '../../utils/db'

const findUserById = findDocumentById(User)

export default findUserById
