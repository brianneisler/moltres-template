import { listPromise } from '../../../../utils/lang'

const createAsyncMiddleware = () => () => (next) => (action) => {
  const promise = listPromise()
  action.promise = promise
  return Promise.resolve(next(action)).then(() => promise.resolve())
}

export default createAsyncMiddleware
