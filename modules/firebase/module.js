import { call } from 'redux-saga/effects'
import reducer from './reducers'
import { setupFirebaseApp } from './sagas'


const module = (config) => {
  function* setup() {
    return yield call(setupFirebaseApp, 'default', config)
  }

  return {
    reducer,
    setup
  }
}

export default module
