import { createContext } from 'moltres'
import { isString } from 'moltres-utils'
import loadEnv from './loadEnv'

const setupContext = ({ env = {}, ...options } = {}) => {
  let values = env
  if (isString(env)) {
    values = loadEnv(env, options)
  }
  return createContext({
    ...values,
    ...process.env,
    NAMESPACE: options.namespace
  })
}

export default setupContext
