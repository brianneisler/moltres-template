import { getDocumentById } from '../../../utils/db'
import { UserPreferences } from '../schemas'

const getUserPreferencesById = getDocumentById(UserPreferences)

export default getUserPreferencesById
