import { listPromise } from '../../../../utils/data'

const createAsyncMiddleware = () => () => (next) => (action) => {
  // const promise = listPromise()
  // action.promise = promise
  // const result = next(action)

  // setTimeout(() => {
  //   promise.resolve()
  // }, 0)
  // return result

  const promise = listPromise()
  action.promise = promise
  next(action)

  setTimeout(() => {
    promise.resolve()
  }, 0)
  return promise
}

export default createAsyncMiddleware
