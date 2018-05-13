import { execGraph } from 'moltres-utils'
import { path } from 'ramda'

const execPlugin = async (pluginName, context) => {
  const { plugin } = path([ 'plugins', pluginName ], context)
  if (!plugin) {
    throw new Error(`Could not find plugin with the name ${pluginName}`)
  }
  return execGraph(
    async (value) => plugin.execNode(value, context),
    context.graph
  )
}

export default execPlugin
