import { resolve } from 'path'

const requireApi = (module) => {
  try {
    return require(resolve(module.path, 'api'))
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      throw error
    }
  }
  return null
}

export default requireApi
