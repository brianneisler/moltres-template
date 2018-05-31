import { curry, path } from 'ramda'

const getPlugin = curry((pluginName, context) => {
  const { plugin } = path([ 'plugins', pluginName ], context)
  if (!plugin) {
    throw new Error(`Could not find plugin with the name ${pluginName}`)
  }
  return plugin
})

export default getPlugin