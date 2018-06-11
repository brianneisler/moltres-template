import { fork } from 'moltres'
import { monitorDimensions } from './util'

function* run() {
  yield fork(monitorDimensions)
}

export default run
