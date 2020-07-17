import { map } from '../../utils/lang'
import createModule from './createModule'

const createModules = (config, context, creators) =>
  map((creator, name) => createModule(config, context, name, creator), creators)

export default createModules
