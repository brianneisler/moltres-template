import stringSubstring from './stringSubstring'

const stringSetIndex = (string, index, character) =>
  stringSubstring(string, 0, index) + character + stringSubstring(string, index + 1)

export default stringSetIndex
