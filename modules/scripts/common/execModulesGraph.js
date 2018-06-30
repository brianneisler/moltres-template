import { execGraph } from './graph'
import { execModule } from './module'

const execModulesGraph = async (scriptsBuilder, graph) => execGraph(
  async (mod) => execModule(scriptsBuilder(mod), mod),
  graph
)

export default execModulesGraph
