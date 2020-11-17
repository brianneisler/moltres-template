import {
  hashPhoneNumber,
  vaidateAndFormatPhoneNumber
} from 'moltres/phone_number'

import findPhoneNumberByHash from './findPhoneNumberByHash'

const findPhoneNumberByPhoneNumber = async (
  context,
  unformattedPhoneNumber,
  options = {}
) => {
  const phoneNumber = vaidateAndFormatPhoneNumber(unformattedPhoneNumber)
  const hash = hashPhoneNumber(phoneNumber)
  return findPhoneNumberByHash(context, hash, options)
}

export default findPhoneNumberByPhoneNumber
