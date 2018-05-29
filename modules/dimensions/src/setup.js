import { all, spawn } from 'moltres'
import { monitorDimensions } from './util'

function* setup() {
  return yield all([
    spawn(monitorDimensions)
  ])
}

export default setup
