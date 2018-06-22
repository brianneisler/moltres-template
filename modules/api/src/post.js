import { call } from 'moltres'
import route from './route'

const POST_METHOD = 'post'

const post = function* (path, handler) {
  yield call(route, path, POST_METHOD, handler)
}

export default post
