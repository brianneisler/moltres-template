import { call } from 'moltres'
import route from './route'

const DELETE_METHOD = 'delete'

const _delete = function*(path, handler) {
  yield call(route, path, DELETE_METHOD, handler)
}

export default _delete
