import _ from 'mudash'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { Driver, select } from '../../../driver'

@select({
  sagas: (sagas) => ({sagas})
})
export default class SagasDriver extends Driver {

  constructor(info) {
    super(info)
    this.sagaMiddleware = null
  }

  createMiddleware() {
    this.sagaMiddleware = createSagaMiddleware()
    return this.sagaMiddleware
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

  initDriver() {
    const sagas = _.get(this.state, 'sagas')
    const sagaMiddleware = this.sagaMiddleware
    sagaMiddleware.run(buildRootSaga(sagas))
  }
}

function buildRootSaga(sagas) {
  return function* rootSaga() {
    yield _.map(_.mutable(sagas), fork)
  }
}
