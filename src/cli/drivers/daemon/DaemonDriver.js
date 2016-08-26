import { Driver } from '../../../driver'
import * as actions from './actions'
import * as commands from './commands'
import saga from './sagas'


export default class DaemonDriver extends Driver {

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
