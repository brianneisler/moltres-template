import { refDocumentById } from '../../utils/db'

import { UserProfile } from './schemas'

const refUserProfileById = refDocumentById(UserProfile)

export default refUserProfileById
