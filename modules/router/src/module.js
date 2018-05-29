import { createHistory } from 'moltres-react'
import { routerMiddleware, routerReducer } from 'react-router-redux'

const module = () => {
  const middleware = routerMiddleware(createHistory())
  return {
    middleware,
    reducer: routerReducer
  }
}

export default module
