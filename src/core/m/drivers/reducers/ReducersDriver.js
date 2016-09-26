import _ from 'mudash'
import o from 'duxtape'
import { Driver } from '../../../driver'

export default class ReducersDriver extends Driver {

  composeReducer(reducer, state) {
    const reducers = _.get(state, 'reducers')
    return o.reduceReducers(..._.reverse(_.values(reducers)), reducer)
  }

  createState(state, drivers) {
    return _.assoc(state, {
      reducers: this.generateReducers(state, drivers)
    })
  }

  generateReducers(state, drivers) {
    return _.reduce(drivers, (reducers, driver) => {
      if (_.isFunction(_.get(driver, 'createReducer'))) {
        const { name } = driver.info
        const reducer = driver.createReducer()
        if (name && reducer) {
          return _.set(reducers, name, reducer)
        }
      }
      return reducers
    }, _.im({}))
  }
}
