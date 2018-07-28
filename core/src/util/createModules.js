import { mapObjIndexed, prop } from 'moltres-utils'
import createModule from './createModule'

const createModules = (config, creators) =>
  mapObjIndexed((creator, name) => createModule(prop(name, config), name, creator), creators)

export default createModules
