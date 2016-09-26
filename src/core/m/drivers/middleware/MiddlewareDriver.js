import _ from 'mudash'
import { applyMiddleware } from 'redux'
import { Driver } from '../../../driver'

export default class MiddlewareDriver extends Driver {

  createState(state, drivers) {
    return _.assoc(state, {
      middleware: this.generateMiddleware(state, drivers)
    })
  }

  createEnhancer(state) {
    const middleware = _.get(state, 'middleware')
    return applyMiddleware(...middleware)
  }

  generateMiddleware(state, drivers) {
    return _.reduce(drivers, (middlewares, driver) => {
      if (_.isFunction(_.get(driver, 'createMiddleware'))) {
        const middleware = driver.createMiddleware(state, drivers)
        if (_.isFunction(middleware)) {
          return _.push(middlewares, middleware)
        }
      }
      return middlewares
    }, _.im([]))
  }
}
