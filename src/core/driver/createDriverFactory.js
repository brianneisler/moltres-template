import _ from 'mudash'
import { isDriverClass, warning } from '../util'

export default function createDriverFactory() {

  function factory(schema, engine) {
    const driverFactory = _.get(schema, 'default')
    const info = _.get(schema, 'info')
    let driver = null
    if (_.isFunction(driverFactory)) {
      if (isDriverClass(driverFactory)) {
        driver = new driverFactory(info, { engine })
      } else {
        driver = driverFactory(info, { engine })
      }
    } else if (_.isObject(driverFactory)) {
      driver = driverFactory
    }
    if (!driver) {
      warning('Driver did not declare an entry point')
    }
    return driver
  }
  return {
    factory
  }
}
