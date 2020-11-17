import {
  hashPhoneNumber,
  vaidateAndFormatPhoneNumber
} from 'moltres/phone_number'

import findPhoneNumberIdByIndexPhoneNumberHash from './findPhoneNumberIdByIndexPhoneNumberHash'

// NOTE BRN: This does not have options because it is an index lookup, not a
// record lookup
const findPhoneNumberIdByPhoneNumber = async (
  context,
  unformattedPhoneNumber
) => {
  const phoneNumber = vaidateAndFormatPhoneNumber(unformattedPhoneNumber)
  const hash = hashPhoneNumber(phoneNumber)
  return findPhoneNumberIdByIndexPhoneNumberHash(context, hash)
}

export default findPhoneNumberIdByPhoneNumber
