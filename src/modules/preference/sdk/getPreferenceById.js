import { getDocumentById } from 'moltres/db'

import { Preference } from '../schemas'

const getPreferenceById = getDocumentById(Preference)

export default getPreferenceById
