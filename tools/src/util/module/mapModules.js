import { all } from 'bluebird'
import { map, values } from 'moltres-utils'

const mapModules = async (modules, context, fn) =>
  all(map(
    (mod) => fn(mod, context),
    values(modules)
  ))

export default mapModules
