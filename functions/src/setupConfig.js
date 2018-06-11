import * as functions from 'firebase-functions'
import { config } from 'moltres'
import { reduceObjIndexed } from 'moltres-utils'
import { assoc, toUpper } from 'ramda'

const setupConfig = () => {
  console.log('functions.config():', JSON.stringify(functions.config()))
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
