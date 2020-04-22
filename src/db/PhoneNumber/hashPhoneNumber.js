import formatPhoneNumber from './formatPhoneNumber'
import sha256 from 'crypto-js/sha256'

const hashPhoneNumber = (phoneNumber) => {
  const formatted = formatPhoneNumber(phoneNumber)
  return sha256(formatted).toString()
}

export default hashPhoneNumber
