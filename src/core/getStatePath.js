import { getPath } from '../utils/data'
import { select } from '../utils/lang'

const getStatePath = function* (path) {
  return yield select((state) => getPath(path, state))
}

export default getStatePath
