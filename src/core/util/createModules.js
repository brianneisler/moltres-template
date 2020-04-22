import { map } from '../../utils/data'
import createModule from './createModule'

const createModules = (config, context, creators) =>
  map((creator, name) => createModule(config, context, name, creator), creators)

export default createModules
