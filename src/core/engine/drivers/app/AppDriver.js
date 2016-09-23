import _ from 'mudash'
import { wrapActions } from '../../../util'
import { Driver, select } from '../../../driver'
import * as actions from './actions'
import reducer from './reducer'
import saga from './sagas'


@select({
  actions: wrapActions((_actions) => {
    return _.pick(_.mutable(_actions), ['awaitApp'])
  }),
  blueprint: blueprint => ({ apps: _.get(blueprint, 'apps') })
})
export default class AppDriver extends Driver {

  constructor(info, context) {
    super(info, context)
    this.engine = context.engine
  }

  createActions() {
    return actions
  }

  createReducer() {
    return reducer
  }

  createSaga() {
    return saga
  }

  initDriver() {
    const { apps } = this.state
    this.state.awaitApp()
    _.each(apps, (app) => {
      const { default: factory } = app
      factory({ app, engine: this.engine })
    })
  }
}
