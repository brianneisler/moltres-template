import { getDocumentById } from 'moltres/db'

import { InternalPhoneNumber } from '../schemas'

const getInternalPhoneNumberByPhoneNumberId = getDocumentById(
  InternalPhoneNumber
)

export default getInternalPhoneNumberByPhoneNumberId
