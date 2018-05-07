import { all } from 'bluebird'
import { map, values } from 'ramda'
import buildModule from './buildModule'

const buildModules = async (modules, context) =>
  all(map(
    (mod) => buildModule(mod, context),
    values(modules)
  ))

export default buildModules
