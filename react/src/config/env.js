import config from 'react-native-config'
const env = {
  ...process.env,
  ...config
}
export default env
