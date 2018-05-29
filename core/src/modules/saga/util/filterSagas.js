import { append, reduce, values } from 'ramda'

const filterSagas = (modules) => reduce(
  (sagas, module) => module.saga ? append(module.saga, sagas) : sagas,
  [],
  values(modules)
)

export default filterSagas
