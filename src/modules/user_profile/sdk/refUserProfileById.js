import { refDocumentById } from 'moltres/db'

import { UserProfile } from '../schemas'

const refUserProfileById = refDocumentById(UserProfile)

export default refUserProfileById
