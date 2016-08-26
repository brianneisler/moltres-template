import _ from 'mudash'
import { isDriverClass, warning } from '../util'

export default class DriverFactory {

  static factoryDriver(schema) {
    const factory = _.get(schema, 'factory')
    const info = _.get(schema, 'info')
    let driver = null
    if (_.isFunction(factory)) {
      if (isDriverClass(factory)) {
        driver = new factory(info)
      }
      driver = factory(info)
    }
    if (!driver) {
      warning('Driver did not declare an entry point')
    }
  }
}
