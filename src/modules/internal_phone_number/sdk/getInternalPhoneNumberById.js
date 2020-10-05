import { getDocumentById } from '../../../utils/db'
import { InternalPhoneNumber } from '../schemas'

const getInternalPhoneNumberById = getDocumentById(InternalPhoneNumber)

export default getInternalPhoneNumberById
