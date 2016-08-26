import _ from 'mudash'
import { Driver } from '../../../driver'
import * as actions from './actions'
import root from './sagas'

export default class CommandsDriver extends Driver {

  createActions() {
    return actions
  }

  createSaga() {
    return root
  }

  createState(state, drivers) {
    return {
      ...state,
      commands: this.generateCommands(state, drivers)
    }
  }

  generateCommands(state, drivers) {
    return _.reduce(drivers, (commands, driver) => {
      if (_.isFunction(_.get(driver, 'createCommands'))) {
        return _.push(commands, driver.createCommands(state, drivers))
      }
      return commands
    }, [])
  }
}
