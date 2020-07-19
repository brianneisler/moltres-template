import sha256 from 'crypto-js/sha256'

import formatPhoneNumber from './formatPhoneNumber'

const hashPhoneNumber = (phoneNumber) => {
  const formatted = formatPhoneNumber(phoneNumber)
  return sha256(formatted).toString()
}

export default hashPhoneNumber
