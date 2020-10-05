import { getDocumentById } from '../../../utils/db'
import { Preference } from '../schemas'

const getPreferenceById = getDocumentById(Preference)

export default getPreferenceById
