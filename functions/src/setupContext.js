import * as functions from 'firebase-functions'
import { createContext } from 'moltres'
import { assoc, propOr, reduceObjIndexed, toUpper } from 'moltres-utils'

const setupContext = (options = {}) => {
  const functionsConfig = reduceObjIndexed(
    (accum, value, name) => assoc(toUpper(name), value, accum),
    {},
    propOr({}, 'moltres', functions.config())
  )

  return createContext({
    ...options.env,
    ...process.env,
    ...functionsConfig,
    NAMESPACE: options.namespace
  })
}

export default setupContext
