import { select } from '../utils/lang'
import { select as selectFromState } from '../utils/redux'

import { selectContext } from './selectors'

const getContext = function* (selector) {
  const context = yield selectFromState(selectContext)
  return select(selector, context)
}

export default getContext
