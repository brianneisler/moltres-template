import { get } from 'moltres-utils'
import { getContext as getContextEffect } from 'redux-saga/effects'

const getConfig = function*(selector) {
  const config = yield getContextEffect('config')
  return get(selector, config)
}

export default getConfig
