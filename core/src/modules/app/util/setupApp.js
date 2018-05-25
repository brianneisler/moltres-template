import { all, call } from 'moltres'
import { compact } from 'moltres-utils'
import { flatten, keys, map, prop } from 'ramda'

function* setupApp(store) {
  const modules = store.getModules()
  const storeConfig = store.getConfig()
  const spawns = yield all(compact(map((name) => {
    const module = prop(name, modules)
    const config = prop(name, storeConfig)
    return call(setupModule, module, name, config)
  }, keys(modules))))
  console.log('modules have been setup') // eslint-disable-line no-console
  return compact(flatten(spawns))
}

export default setupApp
