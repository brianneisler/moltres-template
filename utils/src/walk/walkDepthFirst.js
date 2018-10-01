import curry from '../data/curry'
import forEach from '../data/forEach'
import isObject from '../data/isObject'
import walk from './walk'

const depthFirstWalkee = (value, data, iteratee, recur) => {
  let result = true
  try {
    if (isObject(value)) {
      forEach((child) => {
        result = recur(child, value, iteratee)
        if (result === false) {
          throw new Error('escape')
        }
      }, value)
    }
    result = iteratee(value, data)
  } catch (error) {
    if (error.message !== 'escape') {
      throw error
    }
  }
  return result
}

const walkDepthFirst = curry((iteratee, value) => walk(depthFirstWalkee, iteratee, value))

export default walkDepthFirst
