import { newGraph } from 'moltres-utils'

const newModuleGraph = (mod) => {
  const graph = newGraph()
  graph.setNode(mod.name, mod)
  // Well that was easy...
  return graph
}

export default newModuleGraph
