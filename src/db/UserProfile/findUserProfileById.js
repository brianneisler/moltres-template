import { findDocumentById } from '../../utils/db'

import { UserProfile } from './schemas'

const findUserProfileById = findDocumentById(UserProfile)

export default findUserProfileById
