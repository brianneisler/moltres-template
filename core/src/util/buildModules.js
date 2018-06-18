import { is, isNil, mapObjIndexed, prop } from 'moltres-utils'

const buildModules = (moduleBuilders, config) => mapObjIndexed((moduleBuilder, name) => {
  if (isNil(moduleBuilder)) {
    throw new Error(`Module ${name} is nil. Expecting a function or an object.`)
  }
  if (is(Function, moduleBuilder)) {
    return moduleBuilder(prop(name, config))
  }
  return moduleBuilder
}, moduleBuilders)

export default buildModules
