import isValidPhoneNumber from '../phonenumber/isValidPhoneNumber'

const validatePhoneNumber = (value) =>
  isValidPhoneNumber(value) ? undefined : 'Must be a valid phone number'

export default validatePhoneNumber
