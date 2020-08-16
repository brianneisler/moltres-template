import { refDocumentById } from '../../utils/db'

import { UserPreferences } from './schemas'

const refUserPreferencesById = refDocumentById(UserPreferences)

export default refUserPreferencesById
