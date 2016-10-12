import _ from 'mudash'
import isPluginClass from './isPluginClass'
import { warning } from '../util'

export default function createPluginFactory() {

  function factory(schema, engine) {
    const pluginFactory = _.get(schema, 'default')
    const info = _.get(schema, 'info')
    let plugin = null
    if (_.isFunction(pluginFactory)) {
      if (isPluginClass(pluginFactory)) {
        plugin = new pluginFactory(info, { engine })
      } else {
        plugin = pluginFactory(info, { engine })
      }
    } else if (_.isObject(pluginFactory)) {
      plugin = pluginFactory
    }
    if (!plugin) {
      warning('Plugin did not declare an entry point')
    }
    return plugin
  }
  return {
    factory
  }
}
