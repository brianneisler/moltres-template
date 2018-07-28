import { config, isString } from 'moltres-utils'
import loadEnv from './loadEnv'

const setupConfig = ({ env = {}, ...options } = {}) => {
  let values = env
  if (isString(env)) {
    values = loadEnv(env, options)
  }
  return config({
    ...values,
    ...process.env
  })
}

export default setupConfig
