import { expected } from 'moltres/error'

const verifyPhoneNumber = (phoneNumber, { id, statusCode } = {}) => {
  if (!phoneNumber) {
    throw new Error(`Could not find PhoneNumber${id ? ':' + id : ''}`)
  }
  if (phoneNumber.removedAt) {
    throw expected({
      code: 'PHONE_NUMBER_REMOVED',
      message: `PhoneNumber '${phoneNumber.id}' has been removed`,
      statusCode
    })
  }
  return phoneNumber
}

export default verifyPhoneNumber
