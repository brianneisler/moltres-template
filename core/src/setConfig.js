import { set } from 'moltres-utils'
import { setContext as setContextEffect } from 'redux-saga/effects'
import getConfig from './getConfig'

const setConfig = function*(selector, value) {
  let config = yield* getConfig()
  config = set(selector, value, config)
  // NOTE BRN: HACK since you can only get a property and not the entire
  // context using the getContext effect, we stick the entire context into
  // the "context" property so that we can retrieve the entire thing
  return yield setContextEffect({
    config
  })
}

export default setConfig
