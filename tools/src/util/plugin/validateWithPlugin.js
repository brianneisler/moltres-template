import { has } from 'ramda'
import getPlugin from './getPlugin'

const validateWithPlugin = async (pluginName, context) => {
  const plugin = getPlugin(pluginName, context)
  if (has('validate', plugin)) {
    return plugin.validate(context)
  }
}

export default validateWithPlugin
