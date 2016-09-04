import _ from 'mudash'
import { createSelectorHigherOrder } from 'redux-selectors'
import { Driver } from '../../../driver'

export default class SelectorsDriver extends Driver {

  createHigherOrder(state) {
    const selectors = _.get(state, 'selectors')
    return createSelectorHigherOrder(...selectors)
  }

  createState(state, drivers) {
    return _.assoc(state, {
      selectors: this.generateSelectors(state, drivers)
    })
  }

  generateSelectors(state, drivers) {
    return _.reduce(drivers, (selectors, driver) => {
      if (_.isFunction(_.get(driver, 'createSelector'))) {
        const selector = driver.createSelector(state, drivers)
        if (selector) {
          return _.push(selectors, selector)
        }
      }
      return selectors
    }, _.im([]))
  }
}
