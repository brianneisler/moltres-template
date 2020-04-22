import { PhoneNumberClaim } from './schemas'
import { getDocumentById } from '../../utils/db'

const getPhoneNumberClaimById = getDocumentById(PhoneNumberClaim)

export default getPhoneNumberClaimById
