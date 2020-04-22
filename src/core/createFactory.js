import { isFunction } from '../utils/data'

const createFactory = (func) => (state, ...rest) => {
  if (isFunction(state)) {
    throw new Error('state received was a function. Something went wrong.')
  }
  return func(state, ...rest)
}

export default createFactory
