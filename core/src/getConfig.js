import { assocPath, castPath, isFunction, isString, path } from 'moltres-utils'
import { getContext } from 'redux-saga/effects'

const getConfig = function*(selector) {
  const config = yield getContext('config')
  if (isFunction(selector)) {
    return selector(config)
  }
  if (isString(selector)) {
    const parts = castPath(selector, config)
    return assocPath(parts, path(parts, config), {})
  }
  return config
}

export default getConfig
