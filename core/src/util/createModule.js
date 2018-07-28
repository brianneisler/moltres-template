import { defn, isFunction, isNil } from 'moltres-utils'

const createModule = defn('createModule', (config, name, creator) => {
  if (isNil(creator)) {
    throw new Error(`Module ${name} is nil. Expecting a function or an object.`)
  }
  if (isFunction(creator)) {
    return creator(config)
  }
  return creator // creator IS a module
})

export default createModule
