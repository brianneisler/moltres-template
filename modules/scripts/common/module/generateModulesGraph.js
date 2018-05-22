const { reduce } = require('ramda')
const newGraph = require('../graph/newGraph')

const generateModulesGraph = (modules) => {
  return reduce(
    (graph, mod) => generateModuleGraph(mod, graph),
    newGraph(),
    modules
  )
}

module.exports = generateModuleGraph
