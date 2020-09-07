import { isFunction } from '../../utils/lang'

const createModule = (context, name, creator) => {
  if (!isFunction(creator)) {
    throw new Error(`Module ${name} must be a Function.`)
  }
  return creator(context)
}

export default createModule
