import { assocPath, castPath, isFunction, isString, path } from 'moltres-utils'
import { getContext as getContextEffect } from 'redux-saga/effects'

const getContext = function* (selector) {
  // NOTE BRN: HACK since you can only get a property and not the entire
  // context using the getContext effect, we stick the entire context into
  // the "context" property so that we can retrieve the entire thing
  const context = yield getContextEffect('context')
  if (isFunction(selector)) {
    return selector(context)
  }
  if (isString(selector)) {
    const parts = castPath(selector, context)
    return assocPath(
      parts,
      path(parts, context),
      {}
    )
  }
  return context
}

export default getContext
