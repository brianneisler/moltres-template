import { all, call } from '../../../../utils/lang'
import { compact, flatten, getProp, keys, map } from '../../../../utils/data'
import runModule from './runModule'

function* runStore(store) {
  const modules = store.getModules()
  const mapResult = map((name) => {
    const module = getProp(name, modules)
    return call(runModule, module, name, store)
  }, keys(modules))

  const spawns = yield all(compact(mapResult))
  console.log('store is now running') // eslint-disable-line no-console
  return compact(flatten(spawns))
}

export default runStore
