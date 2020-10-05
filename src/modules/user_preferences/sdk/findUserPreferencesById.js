import { findDocumentById } from '../../../utils/db'
import { UserPreferences } from '../schemas'

const findUserPreferencesById = findDocumentById(UserPreferences)

export default findUserPreferencesById
