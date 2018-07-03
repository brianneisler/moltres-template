import { setContext } from 'redux-saga/effects'

const setConfig = (config) =>
  setContext({
    config
  })

export default setConfig
