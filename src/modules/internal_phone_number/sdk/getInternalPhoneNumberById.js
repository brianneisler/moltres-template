import { getDocumentById } from 'moltres/db'

import { InternalPhoneNumber } from '../schemas'

const getInternalPhoneNumberById = getDocumentById(InternalPhoneNumber)

export default getInternalPhoneNumberById
