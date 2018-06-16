import createPadding from './createPadding'
import stringSize from './stringSize'

const padStart = (string, length, chars) => {
  const strLength = length ? stringSize(string) : 0
  return (length && strLength < length)
    ? (createPadding(length - strLength, chars) + string)
    : string
}

export default padStart
