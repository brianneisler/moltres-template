import { getDocumentById } from '../../../utils/db'
import { PhoneNumberClaim } from '../schemas'

const getPhoneNumberClaimById = getDocumentById(PhoneNumberClaim)

export default getPhoneNumberClaimById
