import { isNaN, isNil } from '../lang'

const validateIntegerOrFalse = (value) => {
  if (isNil(value) || value === false || !isNaN(parseInt(value))) {
    return undefined
  }
  return 'Must be an integer'
}

export default validateIntegerOrFalse
