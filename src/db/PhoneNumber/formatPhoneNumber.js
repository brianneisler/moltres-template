import { newInvalidPhoneNumberException } from './util'
import AwesomePhoneNumber from 'awesome-phonenumber'

const formatPhoneNumber = (phoneNumber) => {
  // NOTE BRN: Assume US numbers for now
  const number = new AwesomePhoneNumber(phoneNumber, 'US')
  if (!number.isValid()) {
    throw newInvalidPhoneNumberException(phoneNumber)
  }
  return number.getNumber()
}

export default formatPhoneNumber
