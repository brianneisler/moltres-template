import { listPromise } from 'moltres-utils'

const createAsyncMiddleware = () => () => (next) => (action) => {
  const promise = listPromise()
  action.promise = promise
  const result = next(action)
  promise.resolve()
  return result
}

export default createAsyncMiddleware
