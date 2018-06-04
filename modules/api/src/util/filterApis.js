import { append, isNil, reduce, values } from 'ramda'
import requireApi from './requireApi'

const filterApis = (modules) => reduce(
  (apis, module) => {
    const api = requireApi(module).default
    if (!isNil(api)) {
      return append(api, apis)
    }
    return apis
  },
  [],
  values(modules)
)

export default filterApis
