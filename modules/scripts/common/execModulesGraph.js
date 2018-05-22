const { execGraph } = require('./graph')
const { execModule } = require('./module')

const execModulesGraph = async (scriptsBuilder, graph) => execGraph(
  async (mod) => execModule(scriptsBuilder(mod))
  graph
)

module.exports = execModulesGraph
