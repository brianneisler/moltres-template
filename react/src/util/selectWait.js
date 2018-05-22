import { isNil } from 'ramda'
import { call, select, take } from 'redux-saga/effects'


// TODO BRN: performance of this can be improved by waiting for an actual state
//  change instead of any action

const selectWait = (selector) =>
  call(doSelect, selector)

function* doSelect(selector) {
  let value = yield select(selector)
  while (isNil(value)) {
    yield take()
    value = yield select(selector)
  }
  return value
}

export default selectWait
