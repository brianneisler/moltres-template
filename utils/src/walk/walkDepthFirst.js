import { curry, forEachObjIndexed, is } from 'ramda'
import walk from './walk'

const depthFirstWalkee = (value, data, iteratee, recur) => {
  let result = true
  try {
    if (is(Object, value)) {
      forEachObjIndexed((child) => {
        result = recur(child, value, iteratee)
        if (result === false) {
          throw new Error('escape')
        }
      }, value)
      result = iteratee(value, data)
    }
  } catch (error) {
    if (error.message !== 'escape') {
      throw error
    }
  }
  return result
}

const walkDepthFirst = curry((iteratee, value) => walk(depthFirstWalkee, iteratee, value))

export default walkDepthFirst
