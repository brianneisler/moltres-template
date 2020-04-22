import { UserProfile } from './schemas'
import { refDocumentById } from '../../utils/db'

const refUserProfileById = refDocumentById(UserProfile)

export default refUserProfileById
