import findPhoneNumberByHash from './findPhoneNumberByHash'
import formatPhoneNumber from './formatPhoneNumber'
import hashPhoneNumber from './hashPhoneNumber'

const findPhoneNumberByPhoneNumber = async (
  context,
  unformattedPhoneNumber,
  options = {}
) => {
  const phoneNumber = formatPhoneNumber(unformattedPhoneNumber)
  const hash = hashPhoneNumber(phoneNumber)
  return findPhoneNumberByHash(context, hash, options)
}

export default findPhoneNumberByPhoneNumber
