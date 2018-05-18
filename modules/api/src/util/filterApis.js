import { append, reduce, values } from 'ramda'

const filterApis = (modules) => reduce(
  (apis, module) => module.api ? append(module.api, apis) : apis,
  [],
  values(modules)
)

export default filterApis
