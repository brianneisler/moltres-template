import _ from 'mudash'
import { DepGraph } from 'dependency-graph'

export default function createRegistry() {

  let moduleMap = {}
  let dependencyGraph = null
  let dependencyGraphValid = false

  function moduleKey(type, name) {
    return `${type}.${name}`
  }

  function register(type, module) {
    const { name } = module.info
    moduleMap = _.assoc(moduleMap, moduleKey(type, name), module)
    dependencyGraphValid = false
  }

  function get(type, name) {
    return _.get(moduleMap, moduleKey(type, name))
  }

  function buildDependencyGraph() {
    const depGraph = _.reduce(moduleMap, (final, modules, type) => {
      return _.reduce(modules, (graph, module) => {
        const { name } = module.info
        graph.addNode(`${type}:${name}`, module)
        return graph
      }, final)
    }, new DepGraph())
    dependencyGraph = _.reduce(moduleMap, (final, modules, type) => {
      return _.reduce(modules, (graph, module) => {
        const { dependencies, name } = module.info
        _.each(dependencies, (typeDependencies, depType) => {

          //TODO BRN: Figure out how to abstract this check
          if (depType !== 'npm') {
            _.each(typeDependencies, (depVersion, depName) => {
              graph.addDependency(`${type}:${name}`, `${depType}:${depName}`)
            })
          }
        })
        return graph
      }, final)
    }, depGraph)
    dependencyGraphValid = true
  }

  function typeMap(types) {
    return _.reduce(types, (reduction, type) => {
      return _.set(reduction, type, true)
    }, {})
  }

  function getInDependencyOrder(types = []) {
    types = typeMap(types)
    if (!dependencyGraphValid) {
      buildDependencyGraph()
    }
    const modules = _.filter(dependencyGraph.overallOrder(), (key) => {
      const [type] = key.split(':')
      return _.has(types, type)
    })
    return _.map(modules,
      (key) => dependencyGraph.getNodeData(key))
  }

  return {
    get,
    getInDependencyOrder,
    register
  }
}
