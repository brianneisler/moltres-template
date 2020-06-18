import { getPath } from '../utils/lang'
import { select } from '../utils/redux'

const getStatePath = function* (path) {
  return yield select((state) => getPath(path, state))
}

export default getStatePath
