import { findDocumentById } from 'moltres/db'

import { UserPreferences } from '../schemas'

const findUserPreferencesById = findDocumentById(UserPreferences)

export default findUserPreferencesById
