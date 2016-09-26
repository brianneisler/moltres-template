import { Driver } from '../../../core/driver'
import * as actions from './actions'
import * as commands from './commands'
import saga from './sagas'


export default class RebuildDriver extends Driver {

  createActions() {
    return actions
  }

  createCommands() {
    return commands
  }

  createSaga() {
    return saga
  }
}
