import { UserProfile } from './schemas'
import { findDocumentById } from '../../utils/db'

const findUserProfileById = findDocumentById(UserProfile)

export default findUserProfileById
