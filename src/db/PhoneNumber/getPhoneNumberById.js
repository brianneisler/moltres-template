import { PhoneNumber } from './schemas'
import { getDocumentById } from '../../utils/db'

const getPhoneNumberById = getDocumentById(PhoneNumber)

export default getPhoneNumberById
