import { isFunction, reduce, values } from '../../../../utils/lang'

const setupSMSCommands = (commands, store) =>
  reduce(
    (accCommands, mod) => {
      if (isFunction(mod.setupSMSCommands)) {
        return mod.setupSMSCommands(accCommands, store)
      }
      return accCommands
    },
    commands,
    values(store.getModules())
  )

export default setupSMSCommands
