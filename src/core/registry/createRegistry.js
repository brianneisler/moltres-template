import _ from 'mudash'
import { DepGraph } from 'dependency-graph'
import { makeModuleKey, moduleKey, modulePath, reduceModules } from '../util'

export default function createRegistry() {

  let moduleMap = {}
  let dependencyGraph = null
  let dependencyGraphValid = false


  function register(module) {
    moduleMap = _.assoc(moduleMap, modulePath(module), module)
    dependencyGraphValid = false
  }

  function hasExact(module) {
    return _.get(moduleMap, modulePath(module)) === module
  }

  function get(namespace, type, name) {
    return _.get(moduleMap, makeModulePath(namespace, type, name))
  }

  function getMap() {
    return moduleMap
  }

  function buildDependencyGraph() {
    const depGraph = reduceModules(moduleMap, (graph, module) => {
      graph.addNode(moduleKey(module), module)
      return graph
    }, new DepGraph())
    dependencyGraph = reduceModules(moduleMap, (graph, module) => {
      const { dependencies } = module.info
      _.each(dependencies, (typeDependencies, depType) => {

        //TODO BRN: Figure out how to abstract this check
        if (depType !== 'npm') {
          _.each(typeDependencies, (depVersion, depName) => {
            graph.addDependency(moduleKey(module), makeModuleKey('moltres', depType, depName))
          })
        }
      })
      return graph
    }, depGraph)
    dependencyGraphValid = true
  }

  function typeMap(types) {
    return _.reduce(types, (reduction, type) => {
      return _.set(reduction, type, true)
    }, {})
  }

  function getInDependencyOrder(namespace, types = []) {
    types = typeMap(types)
    if (!dependencyGraphValid) {
      buildDependencyGraph()
    }
    const modules = _.filter(dependencyGraph.overallOrder(), (key) => {
      const [ns, type] = key.split(':')
      return ns === namespace && _.has(types, type)
    })
    return _.map(modules,
      (key) => dependencyGraph.getNodeData(key))
  }

  return {
    get,
    getInDependencyOrder,
    getMap,
    hasExact,
    register
  }
}
