import _ from 'mudash'

export default function reduceModules(moduleMap, func, initial) {
  return _.reduce(moduleMap, (final1, modulesByType) => {
    return _.reduce(modulesByType, (final2, modulesByName) => {
      return _.reduce(modulesByName, func, final2)
    }, final1)
  }, initial)
}
