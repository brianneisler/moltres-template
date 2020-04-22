import curry from './curry'
import isObjectLike from './isObjectLike'
import map from './map'
import walk from './walk'

const mapWalkee = () => {
  const visited = new Set()
  return (iteratee, value, recur) => {
    if (isObjectLike(value)) {
      value = map(iteratee, value)
      if (!visited.has(value)) {
        return map((child) => recur(iteratee, child), value)
      }
    }
    return value
  }
}

const walkMap = curry((iteratee, collection) => walk(mapWalkee(), iteratee, collection))

export default walkMap
