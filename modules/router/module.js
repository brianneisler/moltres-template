import { routerMiddleware, routerReducer } from 'react-router-redux'
import { createHistory } from '../../util'

const module = () => {
  const middleware = routerMiddleware(createHistory())
  return {
    middleware,
    reducer: routerReducer
  }
}

export default module
