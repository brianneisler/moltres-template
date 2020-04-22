import { select } from '../utils/data'
import { selectContext } from './selectors'
import { select as selectFromState } from '../utils/lang'

const getContext = function* (selector) {
  const context = yield selectFromState(selectContext)
  return select(selector, context)
}

export default getContext
