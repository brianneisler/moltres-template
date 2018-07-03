import { getContext } from 'moltres'

const addRoute = function*(route) {
  const { api } = yield* getContext('api')
  api.addRoute(route)
}

export default addRoute
