import { map, pipe, values } from 'moltres-utils'
import generateConfig from './util/generateConfig'

const createConfig = (modules, context) => {
  const chain = map((module) => generateConfig(context, module), values(modules))
  const createMethod = pipe(...chain)
  return createMethod({})
}

export default createConfig
