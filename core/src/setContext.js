import { set } from 'moltres-utils'
import { setContext as setContextEffect } from 'redux-saga/effects'
import getContext from './getContext'

const setContext = function*(selector, value) {
  let context = yield* getContext()
  context = set(selector, value, context)
  // NOTE BRN: HACK since you can only get a property and not the entire
  // context using the getContext effect, we stick the entire context into
  // the "context" property so that we can retrieve the entire thing
  return yield setContextEffect({
    context
  })
}

export default setContext
