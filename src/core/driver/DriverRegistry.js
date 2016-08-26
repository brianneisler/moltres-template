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
    }, new DepGraph())
    DriverRegistry.driverDependencyGraph = _.reduce(DriverRegistry.driverMap, (graph, driver) => {
      const { dependencies, name } = driver.info
      _.each(dependencies, (depVersion, depName) => {
        graph.addDependency(name, depName)
      })
    }, depGraph)
  }

  static getDriversInDependencyOrder() {
    if (!DriverRegistry.dependencyGraphValid) {
      DriverRegistry.buildDependencyGraph()
    }
    return DriverRegistry.driverDependencyGraph.overallOrder()
  }
}
