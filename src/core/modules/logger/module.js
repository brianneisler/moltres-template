import logger from 'redux-logger'

import { getPath } from '../../../utils/lang'

const mod = (config) => {
  let middleware = []
  if (getPath(['core', 'debug'], config)) {
    middleware = [logger]
  }
  return {
    middleware
  }
}

export default mod
