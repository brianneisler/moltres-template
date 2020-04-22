import { identity, isFunction } from '../../utils/data'

const generateConfig = (context, module) => {
  if (isFunction(module.generateConfig)) {
    return module.generateConfig(context)
  }
  return identity
}

export default generateConfig
