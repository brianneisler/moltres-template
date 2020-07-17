import { reduxBatch } from '@manaflair/redux-batch'
import { applyMiddleware } from 'redux'

import filterMiddleware from './filterMiddleware'

// HACK BRN: The enhancer order should really be provided by the modules and
// this would figure out sort order. But for now we're just hard coding enchancers
const filterEnhancers = (modules) => [
  reduxBatch,
  applyMiddleware(...filterMiddleware(modules)),
  reduxBatch
]

export default filterEnhancers
