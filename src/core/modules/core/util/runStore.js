import { compact, flatten, getProp, keys, map } from '../../../../utils/lang'
import { all, call } from '../../../../utils/redux'

import runModule from './runModule'

function* runStore(store) {
  const modules = store.getModules()
  const mapResult = map((name) => {
    const mod = getProp(name, modules)
    return call(runModule, mod, name, store)
  }, keys(modules))

  const spawns = yield all(compact(mapResult))
  console.log('store is now running') // eslint-disable-line no-console
  return compact(flatten(spawns))
}

export default runStore
