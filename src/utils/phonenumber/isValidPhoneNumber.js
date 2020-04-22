import AwesomePhoneNumber from 'awesome-phonenumber'

const isValidPhoneNumber = (value) => {
  // NOTE BRN: Assume US numbers for now
  try {
    const number = new AwesomePhoneNumber(value, 'US')
    return number.isValid()
  } catch (error) {
    return false
  }
}

export default isValidPhoneNumber
