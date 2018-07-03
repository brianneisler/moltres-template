import { getContext } from 'moltres'

const removeRoute = function*(route) {
  const { api } = yield* getContext('api')
  api.removeRoute(route)
}

export default removeRoute
