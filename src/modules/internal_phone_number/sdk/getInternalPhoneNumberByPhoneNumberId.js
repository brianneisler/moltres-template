import { getDocumentById } from '../../../utils/db'
import { InternalPhoneNumber } from '../schemas'

const getInternalPhoneNumberByPhoneNumberId = getDocumentById(
  InternalPhoneNumber
)

export default getInternalPhoneNumberByPhoneNumberId
