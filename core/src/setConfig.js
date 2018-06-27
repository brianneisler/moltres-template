import { setContext } from 'redux-saga/effects'

const setConfig = function*(config) {
  yield setContext({
    config
  })
}

export default setConfig
