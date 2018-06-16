import { castPath, isFunction } from 'moltres-utils'
import { assocPath, path } from 'ramda'
import { getContext } from 'redux-saga/effects'

const getConfig = function* (selector) {
  const config = yield getContext('config')
  if (isFunction(selector)) {
    return selector(config)
  }
  const parts = castPath(selector, config)
  return assocPath(
    parts,
    path(parts, config),
    {}
  )
}

export default getConfig
