import { select } from '../utils/data'
import { selectConfig } from './selectors'
import { select as selectFromState } from '../utils/lang'

const getConfig = function* (selector) {
  const config = yield selectFromState(selectConfig)
  return select(selector, config)
}

export default getConfig
