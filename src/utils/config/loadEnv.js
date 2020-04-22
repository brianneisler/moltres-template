import { isEmpty, keys } from '../data'
import { resolve } from 'path'
import loadDotEnv from './loadDotEnv'

// TODO: Split this function into different versions based on ios, android and web
// import env from 'react-native-config'

// TODO BRN: Figure out how to pass a context into this function so that we can
// retrieve the logger from it
const loadEnv = (envPath, options = {}) => {
  let loadedEnv = loadDotEnv(envPath, options)
  // const functionsConfig = functions.config()
  // if (functionsConfig && functionsConfig.dot) {
  //   console.log('Found functions config')
  //   loadedEnv = {
  //     ...loadedEnv,
  //     ...dotenv.parse(pathOr({}, ['dot', 'env'], functionsConfig))
  //   }
  // }

  // HACK: Ugly hack because firebase config is wack.
  // We must be in the function running on Google
  if (isEmpty(keys(loadedEnv))) {
    try {
      const data = require(resolve(envPath, 'private', 'dist', `config.json`))
      // eslint-disable-next-line no-console
      console.log('Found config.json file')
      loadedEnv = {
        ...loadedEnv,
        ...data
      }
    } catch (error) {}
  }
  process.env = {
    ...process.env,
    ...loadedEnv
  }
  return process.env
}

export default loadEnv
