import { applyMiddleware } from 'redux'
import filterMiddleware from './filterMiddleware'

const filterEnhancers = (modules) => [
  applyMiddleware(...filterMiddleware(modules))
]

export default filterEnhancers
