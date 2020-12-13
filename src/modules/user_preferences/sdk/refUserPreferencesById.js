import { refDocumentById } from 'moltres/db'

import { UserPreferences } from '../schemas'

const refUserPreferencesById = refDocumentById(UserPreferences)

export default refUserPreferencesById
