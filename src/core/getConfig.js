import { select } from '../utils/lang'
import { select as selectFromState } from '../utils/redux'

import { selectConfig } from './selectors'

const getConfig = function* (selector) {
  const config = yield selectFromState(selectConfig)
  return select(selector, config)
}

export default getConfig
