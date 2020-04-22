import call from './call'
import isNil from '../data/isNil'
import select from './select'
import take from './take'

// TODO BRN: performance of this can be improved by waiting for an actual state
//  change instead of any action

function* doSelect(selector) {
  let value = yield select(selector)
  while (isNil(value)) {
    yield take()
    value = yield select(selector)
  }
  return value
}

const waitSelect = (selector) => call(doSelect, selector)

export default waitSelect
