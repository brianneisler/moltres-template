import { InternalPhoneNumber } from './schemas'
import { getDocumentById } from '../../utils/db'

const getInternalPhoneNumberByPhoneNumberId = getDocumentById(InternalPhoneNumber)

export default getInternalPhoneNumberByPhoneNumberId
