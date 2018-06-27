import { call } from 'moltres'
import route from './route'

const GET_METHOD = 'get'

const get = function*(path, handler) {
  yield call(route, path, GET_METHOD, handler)
}

export default get
