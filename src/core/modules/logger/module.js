import logger from 'redux-logger'

import { getPath } from '../../../utils/lang'

import * as selectors from './selectors'

const mod = ({ config }) => {
  let middleware = []
  if (getPath(['core', 'debug'], config)) {
    middleware = [logger]
  }
  return {
    middleware,
    selectors
  }
}

export default mod
