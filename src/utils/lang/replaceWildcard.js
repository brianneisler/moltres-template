import curry from './curry'
import isNil from './isNil'
import isWildcard from './isWildcard'

const replaceWildcard = curry((wildValues, part) => {
  if (isWildcard(part)) {
    if (!wildValues.has(part) && !isNil(wildValues.get(part))) {
      throw new Error(`wildValues missing wildcard '${part}'`)
    }
    return wildValues.get(part)
  }
  return part
})

export default replaceWildcard
