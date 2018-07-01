import { forEach, newGraph } from 'moltres-utils'
import moduleNodeId from './moduleNodeId'
import modulesDirNodeId from './modulesDirNodeId'
import walkModule from './walkModule'

const generateModuleGraph = (mod, options = {}, graph = newGraph()) => {
  if (!options.only) {
    walkModule((node) => {
      graph.setNode(moduleNodeId(node), node)
      graph.setNode(modulesDirNodeId(node.modulesDir), node.modulesDir)
    }, mod)
    walkModule((node) => {
      graph.setEdge(moduleNodeId(node), modulesDirNodeId(node.modulesDir))
      forEach(
        (depModule) => graph.setEdge(moduleNodeId(mod), moduleNodeId(depModule)),
        node.dependsOn
      )
    }, mod)
  } else {
    graph.setNode(moduleNodeId(mod), mod)
  }
  return graph
}

export default generateModuleGraph
