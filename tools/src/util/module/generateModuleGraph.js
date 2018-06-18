import { forEach, newGraph } from 'moltres-utils'
import moduleNodeId from './moduleNodeId'
import walkModule from './walkModule'

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

export default generateModuleGraph
