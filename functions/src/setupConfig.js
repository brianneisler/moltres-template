import * as functions from 'firebase-functions'
import { config } from 'moltres'
import { assoc, reduceObjIndexed, toUpper } from 'moltres-utils'

const setupConfig = () => {
  const functionsConfig = reduceObjIndexed((subConfigAccum, subConfig, subConfigName) => {
    return reduceObjIndexed((accum, value, name) => assoc(
      `${toUpper(subConfigName)}_${toUpper(name)}`,
      value,
      subConfigAccum
    ), subConfigAccum, subConfig)
  }, {}, functions.config())

  return config({
    ...process.env,
    ...functionsConfig
  })
}

export default setupConfig
