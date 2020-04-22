import { InternalPhoneNumber } from './schemas'
import { getDocumentById } from '../../utils/db'

const getInternalPhoneNumberById = getDocumentById(InternalPhoneNumber)

export default getInternalPhoneNumberById
