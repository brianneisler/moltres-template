import {
  concat,
  isFunction,
  map,
  reduce,
  values
} from 'moltres/lang'

import createScript from './createScript'

const loadScripts = async (context, store) =>
  reduce(
    async (scripts, mod) => {
      if (isFunction(mod.loadScripts)) {
        const results = await mod.loadScripts(context, store)
        if (results) {
          return concat(scripts, map(createScript, results))
        }
      }
      return scripts
    },
    [],
    values(store.getModules())
  )

export default loadScripts
