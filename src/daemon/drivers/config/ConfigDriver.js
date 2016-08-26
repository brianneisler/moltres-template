import { Driver } from '../../../driver'
import * as actions from './actions'
import root from './sagas'

export default class ConfigDriver extends Driver {

  createActions() {
    return actions
  }

  createSaga() {
    return root
  }
}
