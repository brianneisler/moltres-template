import { weakMemoize } from '../lang'
import UAParser from 'ua-parser-js'

const getUserAgentData = weakMemoize(() => {
  const UA = new UAParser()

  return {
    browser: UA.getBrowser(),
    cpu: UA.getCPU(),
    device: UA.getDevice(),
    engine: UA.getEngine(),
    os: UA.getOS(),
    ua: UA.getUA()
  }
})

export default getUserAgentData
