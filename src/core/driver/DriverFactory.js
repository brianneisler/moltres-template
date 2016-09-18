import _ from 'mudash'
import { isDriverClass, warning } from '../util'

export default class DriverFactory {

  static factoryDriver(schema) {
    const factory = _.get(schema, 'default')
    const info = _.get(schema, 'info')
    let driver = null
    if (_.isFunction(factory)) {
      if (isDriverClass(factory)) {
        driver = new factory(info)
      } else {
        driver = factory(info)
      }
    } else if (_.isObject(factory)) {
      driver = factory
      driver.info = info
    }
    if (!driver) {
      warning('Driver did not declare an entry point')
    }
    return driver
  }
}
