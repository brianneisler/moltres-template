import { findDocumentById } from 'moltres/db'

import { UserProfile } from '../schemas'

const findUserProfileById = findDocumentById(UserProfile)

export default findUserProfileById
