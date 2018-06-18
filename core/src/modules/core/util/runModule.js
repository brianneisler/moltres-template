import { is } from 'moltres-utils'
import spawn from '../../../spawn'

function* runModule(module, name, config) {
  const { run } = module
  if (is(Function, run)) {
    console.log(`Setting up module ${name}`) // eslint-disable-line no-console
    const result = yield spawn(run, config)
    console.log(`Setting up module ${name} complete`) // eslint-disable-line no-console
    return result
  }
  console.log(`skipping run for module ${name} because no run method was found`) // eslint-disable-line no-console
}

export default runModule
