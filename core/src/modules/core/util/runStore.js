import { compact, flatten, keys, map, prop } from 'moltres-utils'
import all from '../../../all'
import call from '../../../call'
import runModule from './runModule'

function* runStore(store) {
  const modules = store.getModules()
  const storeConfig = store.getConfig()
  const spawns = yield all(
    compact(
      map((name) => {
        const module = prop(name, modules)
        const config = prop(name, storeConfig)
        return call(runModule, module, name, config)
      }, keys(modules))
    )
  )
  console.log('store is now running') // eslint-disable-line no-console
  return compact(flatten(spawns))
}

export default runStore
