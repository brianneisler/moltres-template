const { reduce, values } = require('ramda')
const newGraph = require('../graph/newGraph')
const generateModuleGraph = require('./generateModuleGraph')

const generateModulesGraph = (modules) => reduce(
  (graph, mod) => generateModuleGraph(mod, graph),
  newGraph(),
  values(modules)
)

module.exports = generateModulesGraph
