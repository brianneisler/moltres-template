import { User } from './schemas'
import { getDocumentById } from '../../utils/db'

const getUserById = getDocumentById(User)

export default getUserById
