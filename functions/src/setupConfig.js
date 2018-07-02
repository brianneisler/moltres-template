import * as functions from 'firebase-functions'
import { config } from 'moltres'
import { assoc, propOr, reduceObjIndexed, toUpper } from 'moltres-utils'

const setupConfig = () => {
  const functionsConfig = reduceObjIndexed(
    (accum, value, name) => assoc(toUpper(name), value, accum),
    {},
    propOr({}, 'moltres', functions.config())
  )

  return config({
    ...process.env,
    ...functionsConfig
  })
}

export default setupConfig
