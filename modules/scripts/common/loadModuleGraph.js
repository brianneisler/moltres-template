const { resolve } = require('path')
const { findModules, generateModulesGraph } = require('./module')

const MODULES_PATH = resolve(__dirname, '..', '..')

const loadModuleGraph = async (cwd) => {
  const modules = await findModules(MODULES_PATH)
  return generateModulesGraph(modules)
}

module.exports = loadModuleGraph
