import { findDocumentById } from 'moltres/db'
import { Preference } from '../schemas'

const findPreferenceById = findDocumentById(Preference)

export default findPreferenceById
