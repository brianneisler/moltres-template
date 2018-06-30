import { resolve } from 'path'
import { findModules, generateModulesGraph } from './module'

const MODULES_PATH = resolve(__dirname, '..', '..')

const loadModulesGraph = async (cwd) => {
  const modules = await findModules(MODULES_PATH)
  return generateModulesGraph(modules)
}

export default loadModulesGraph
