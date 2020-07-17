import { isFunction, last } from '../utils/lang'

const start = (...args) => {
  const lastArg = last(args)
  if (isFunction(lastArg.start)) {
    return lastArg.start(...args)
  }
  return lastArg
}

export default start
