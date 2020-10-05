import { getDocumentById } from '../../../utils/db'
import { PhoneNumber } from '../schemas'

const getPhoneNumberById = getDocumentById(PhoneNumber)

export default getPhoneNumberById
