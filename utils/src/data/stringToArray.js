import asciiToArray from './asciiToArray'
import hasUnicode from './hasUnicode'
import unicodeToArray from './unicodeToArray'

const stringToArray = (string) =>
  hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string)

export default stringToArray
