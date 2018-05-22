const { forEach } = require('ramda')
const newGraph = require('../graph/newGraph')
const moduleNodeId = require('./moduleNodeId')
const walkModule = require('./walkModule')

const generateModuleGraph = (mod, graph = newGraph()) => {
  walkModule(
    (node) => graph.setNode(moduleNodeId(node), node),
    mod
  )
  walkModule(
    (node) => {
      forEach(
        (depModule) => graph.setEdge(
          moduleNodeId(mod),
          moduleNodeId(depModule)
        ),
        node.dependsOn
      )
    },
    mod
  )
  return graph
}

module.exports = generateModuleGraph
