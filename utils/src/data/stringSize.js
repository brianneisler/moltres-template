import asciiSize from './asciiSize'
import hasUnicode from './hasUnicode'
import unicodeSize from './unicodeSize'

const stringSize = (string) =>
  hasUnicode(string) ? unicodeSize(string) : asciiSize(string)

export default stringSize
