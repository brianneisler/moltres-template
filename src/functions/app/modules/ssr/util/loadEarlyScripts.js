import {
  concat,
  isFunction,
  map,
  reduce,
  values
} from '../../../../../utils/data'
import createScript from './createScript'

const loadEarlyScripts = async (context, store) =>
  reduce(
    async (scripts, mod) => {
      if (isFunction(mod.loadEarlyScripts)) {
        const results = await mod.loadEarlyScripts(context, store)
        if (results) {
          return concat(scripts, map(createScript, results))
        }
      }
      return scripts
    },
    [],
    values(store.getModules())
  )

export default loadEarlyScripts
