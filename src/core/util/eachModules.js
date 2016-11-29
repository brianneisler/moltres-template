import _ from 'mudash'

export default function eachModules(moduleMap, func) {
  return _.each(moduleMap, (modulesByType, namespace) => {
    return _.each(modulesByType, (modulesByName, type) => {
      return _.each(modulesByName, (module, name) => func(module, name, type, namespace))
    })
  })
}
