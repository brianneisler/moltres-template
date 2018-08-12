import { get } from 'moltres-utils'
import { getContext as getContextEffect } from 'redux-saga/effects'

const getContext = function*(selector) {
  // NOTE BRN: HACK since you can only get a property and not the entire
  // context using the getContext effect, we stick the entire context into
  // the "context" property so that we can retrieve the entire thing
  const context = yield getContextEffect('context')
  return get(selector, context)
}

export default getContext
