import findPhoneNumberIdByIndexPhoneNumberHash from './findPhoneNumberIdByIndexPhoneNumberHash'
import formatPhoneNumber from './formatPhoneNumber'
import hashPhoneNumber from './hashPhoneNumber'

// NOTE BRN: This does not have options because it is an index lookup, not a
// record lookup
const findPhoneNumberIdByPhoneNumber = async (context, unformattedPhoneNumber) => {
  const phoneNumber = formatPhoneNumber(unformattedPhoneNumber)
  const hash = hashPhoneNumber(phoneNumber)
  return findPhoneNumberIdByIndexPhoneNumberHash(context, hash)
}

export default findPhoneNumberIdByPhoneNumber
