import { setContext as setContextEffect } from 'redux-saga/effects'

const setContext = function* (context) {
  // NOTE BRN: HACK since you can only get a property and not the entire
  // context using the getContext effect, we stick the entire context into
  // the "context" property so that we can retrieve the entire thing
  yield setContextEffect({
    context
  })
}

export default setContext
