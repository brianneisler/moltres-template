import { concat, isFunction, reduce, values } from '../../../../utils/lang'

const setupCliCommands = (store) =>
  reduce(
    (accumCommands, mod) => {
      if (isFunction(mod.setupCliCommands)) {
        return concat(accumCommands, mod.setupCliCommands(store))
      }
      return accumCommands
    },
    [],
    values(store.getModules())
  )
export default setupCliCommands
