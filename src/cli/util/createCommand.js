import { isFunction, isNil } from '../../utils/lang'

const createCommand = (config, context, name, creator) => {
  if (isNil(creator)) {
    throw new Error(`Module ${name} is nil. Expecting a function or an object.`)
  }
  if (isFunction(creator)) {
    return creator(config, context)
  }
  return creator // creator IS a module
}

export default createCommand
