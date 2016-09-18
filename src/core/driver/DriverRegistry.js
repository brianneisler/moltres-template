import _ from 'mudash'
import { DepGraph } from 'dependency-graph'

export default class DriverRegistry {
  static driverMap = {}
  static driverDependencyGraph = null
  static dependencyGraphValid = false

  static registerDriver(driver) {
    const { name } = driver.info
    DriverRegistry.driverMap = _.set(DriverRegistry.driverMap, name, driver)
    DriverRegistry.dependencyGraphValid = false
  }

  static getDriver(name) {
    return _.get(DriverRegistry.driverMap, name)
  }

  static buildDependencyGraph() {
    const depGraph = _.reduce(DriverRegistry.driverMap, (graph, driver) => {
      const { name } = driver.info
      graph.addNode(name, driver)
      return graph
    }, new DepGraph())
    DriverRegistry.driverDependencyGraph = _.reduce(DriverRegistry.driverMap, (graph, driver) => {
      const { dependencies, name } = driver.info
      const driverDependencies = _.get(dependencies, 'drivers')
      _.each(driverDependencies, (depVersion, depName) => {
        graph.addDependency(name, depName)
      })
      return graph
    }, depGraph)
    DriverRegistry.dependencyGraphValid = true
  }

  static getDriversInDependencyOrder() {
    if (!DriverRegistry.dependencyGraphValid) {
      DriverRegistry.buildDependencyGraph()
    }
    return _.map(DriverRegistry.driverDependencyGraph.overallOrder(),
      (name) => DriverRegistry.driverDependencyGraph.getNodeData(name))
  }
}
