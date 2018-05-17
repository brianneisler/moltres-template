import { flatten, is, isNil, keys, map, prop, reject } from 'ramda'
import { all, call } from 'redux-saga/effects'


const compact = reject(isNil)

export function* setupApp(modules) {
  const spawns = yield all(compact(map((name) => {
    const module = prop(name, modules)
    return call(setupModule, module, name)
  }, keys(modules))))
  console.log('modules have been setup') // eslint-disable-line no-console
  return compact(flatten(spawns))
}

function* setupModule(module, name) {
  const { setup } = module
  if (is(Function, setup)) {
    console.log(`Setting up module ${name}`) // eslint-disable-line no-console
    const result = yield call(setup)
    console.log(`Setting up module ${name} complete`) // eslint-disable-line no-console
    return result
  }
}
