import { isEmpty, random, values } from '../../utils/lang'

import findAllInternalPhoneNumbers from './findAllInternalPhoneNumbers'

const getRandomInternalPhoneNumber = async (context, options = {}) => {
  // TODO BRN: need to balance these messages across numbers based on rate limit
  // of 1 message/sec for twilio
  const internalPhoneNumbers = values(
    await findAllInternalPhoneNumbers(context, options)
  )
  if (isEmpty(internalPhoneNumbers)) {
    throw new Error('Could not find any internal phone numbers.')
  }
  const i = random(0, internalPhoneNumbers.length - 1)
  return internalPhoneNumbers[i]
}

export default getRandomInternalPhoneNumber
