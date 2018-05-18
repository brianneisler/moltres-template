import { compact } from 'moltres-utils'
import { flatten, keys, map, prop } from 'ramda'
import { all, call } from 'redux-saga/effects'

function* setupApp(modules) {
  const spawns = yield all(compact(map((name) => {
    const module = prop(name, modules)
    return call(setupModule, module, name)
  }, keys(modules))))
  console.log('modules have been setup') // eslint-disable-line no-console
  return compact(flatten(spawns))
}

export default setupApp
