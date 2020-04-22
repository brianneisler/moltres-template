import { isFunction, last } from '../utils/data'

const _finally = (...args) => {
  const lastArg = last(args)
  if (isFunction(lastArg.finally)) {
    return lastArg.finally(...args)
  }
  return lastArg
}

export default _finally
