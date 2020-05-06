import { getPath } from '../data'

const isTestAppConfigured = (config) =>
  (config.stage === 'local' || config.test) && !getPath(['test', 'integration'], config)

export default isTestAppConfigured
