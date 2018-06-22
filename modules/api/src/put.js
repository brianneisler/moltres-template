import { call } from 'moltres'
import route from './route'

const  PUT_METHOD = 'put'

const put = function* (path, handler) {
  yield call(route, path, PUT_METHOD, handler)
}

export default put
