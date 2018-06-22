import { call } from 'moltres'
import route from './route'

const ALL_METHOD = 'all'

const all = function* (path, handler) {
  yield call(route, path, ALL_METHOD, handler)
}

export default all
