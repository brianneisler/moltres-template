import { execGraph } from 'moltres-utils'
import getPlugin from './getPlugin'

const execWithPlugin = async (pluginName, context) => {
  const plugin = getPlugin(pluginName, context)
  await execGraph(async (value) => plugin.execNode(value, context), context.graph)
  return context
}

export default execWithPlugin
