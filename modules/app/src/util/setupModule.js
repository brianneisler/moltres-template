import { is } from 'ramda'
import { call } from 'redux-saga/effects'

function* setupModule(module, name) {
  const { setup } = module
  if (is(Function, setup)) {
    console.log(`Setting up module ${name}`) // eslint-disable-line no-console
    const result = yield call(setup)
    console.log(`Setting up module ${name} complete`) // eslint-disable-line no-console
    return result
  }
}

export default setupModule
