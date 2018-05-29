import { version } from '../../package.json'

const printCoreVersion = (logger) => {
  logger.reassure(`v${version}`)
}

export default printCoreVersion
