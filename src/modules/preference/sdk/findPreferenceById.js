import { findDocumentById } from '../../../utils/db'
import { Preference } from '../schemas'

const findPreferenceById = findDocumentById(Preference)

export default findPreferenceById
