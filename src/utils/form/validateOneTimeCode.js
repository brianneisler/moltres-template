const REGEX_ONE_TIME_CODE = /^[0-9]{6}$/

const validateOneTimeCode = (value) =>
  value && value.match(REGEX_ONE_TIME_CODE)
    ? undefined
    : 'Code must be a 6 digit number'

export default validateOneTimeCode
