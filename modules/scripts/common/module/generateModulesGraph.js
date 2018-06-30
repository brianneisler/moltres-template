import { reduce, values } from 'ramda'
import newGraph from '../graph/newGraph'
import generateModuleGraph from './generateModuleGraph'

const generateModulesGraph = (modules) => reduce(
  (graph, mod) => generateModuleGraph(mod, graph),
  newGraph(),
  values(modules)
)

export default generateModulesGraph
