import { select } from '../utils/lang'
import { selectConfig } from './selectors'
import { select as selectFromState } from '../utils/redux'

const getConfig = function* (selector) {
  const config = yield selectFromState(selectConfig)
  return select(selector, config)
}

export default getConfig
