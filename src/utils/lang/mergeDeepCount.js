import isNumber from './isNumber'
import isUndefined from './isUndefined'
import mergeDeepWith from './mergeDeepWith'
import reduce from './reduce'

const mergeDeepCount = reduce(
  mergeDeepWith((valueA, valueB) => {
    if (isNumber(valueA) && isNumber(valueB)) {
      return valueA + valueB
    }
    if (isUndefined(valueB)) {
      return valueA
    }
    return valueB
  }),
  {}
)

export default mergeDeepCount
