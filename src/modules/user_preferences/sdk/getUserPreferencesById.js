import { getDocumentById } from 'moltres/db'

import { UserPreferences } from '../schemas'

const getUserPreferencesById = getDocumentById(UserPreferences)

export default getUserPreferencesById
