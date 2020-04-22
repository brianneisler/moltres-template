import { isFunction, last } from '../utils/data'

const stop = (...args) => {
  const lastArg = last(args)
  if (isFunction(lastArg.stop)) {
    return lastArg.stop(...args)
  }
  return lastArg
}

export default stop
