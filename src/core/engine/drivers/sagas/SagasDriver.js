import _ from 'mudash'
import createSagaMiddleware from 'redux-saga'
import { Driver } from '../../../driver'

export default class SagasDriver extends Driver {

  createMiddleware(state) {
    const sagas = _.get(state, 'sagas')
    return createSagaMiddleware(...sagas)
  }

  createState(state, drivers) {
    return _.assoc(state, {
      sagas: this.generateSagas(state, drivers)
    })
  }

  generateSagas(state, drivers) {
    return _.reduce(drivers, (sagas, driver) => {
      if (_.isFunction(_.get(driver, 'createSaga'))) {
        const saga = driver.createSaga(state, drivers)
        if (saga) {
          return _.push(sagas, saga)
        }
      }
      return sagas
    }, _.im([]))
  }
}
