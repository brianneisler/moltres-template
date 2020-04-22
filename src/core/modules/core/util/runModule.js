import { isFunction } from '../../../../utils/data'
import { spawn } from '../../../../utils/lang'

function* runModule(module, name, store) {
  const { run } = module
  if (isFunction(run)) {
    // eslint-disable-next-line no-console
    console.log(`Running module ${name}`) // eslint-disable-line no-console
    return yield spawn(run, store)
  }
  // eslint-disable-next-line no-console
  console.log(`skipping run for module ${name} because no run method was found`) // eslint-disable-line no-console
}

export default runModule
