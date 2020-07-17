import { select } from '../utils/lang'
import { selectContext } from './selectors'
import { select as selectFromState } from '../utils/redux'

const getContext = function* (selector) {
  const context = yield selectFromState(selectContext)
  return select(selector, context)
}

export default getContext
