import { config } from 'moltres'
import env from 'react-native-config'

const setupConfig = () => config({
  ...process.env,
  ...env
})

export default setupConfig
