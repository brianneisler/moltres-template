const newInvalidPhoneNumberException = (value) => {
  const error = new Error(`The phone number ${value} is not a valid number`)
  error.code = 'INVALID_PHONE_NUMBER'
  return error
}

export default newInvalidPhoneNumberException
