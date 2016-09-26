import _ from 'mudash'
import { applyHigherOrder } from 'duxtape'
import { Driver } from '../../../driver'

export default class HigherOrderDriver extends Driver {

  createState(state, drivers) {
    return _.assoc(state, {
      higherOrders: this.generateHigherOrders(state, drivers)
    })
  }

  createEnhancer(state) {
    const higherOrders = _.get(state, 'higherOrders')
    return applyHigherOrder(...higherOrders)
  }

  generateHigherOrders(state, drivers) {
    return _.reduce(drivers, (higherOrders, driver) => {
      if (_.isFunction(_.get(driver, 'createHigherOrder'))) {
        const higherOrder = driver.createHigherOrder(state, drivers)
        if (_.isFunction(higherOrder)) {
          return _.push(higherOrders, higherOrder)
        }
      }
      return higherOrders
    }, _.im([]))
  }
}
