import { execGraph, path } from 'moltres-utils'
import getPlugin from './getPlugin'

const execWithPlugin = async (pluginName, context) => {
  const plugin = getPlugin(pluginName, context)
  return execGraph(
    async (value) => plugin.execNode(value, context),
    context.graph
  )
}

export default execWithPlugin
