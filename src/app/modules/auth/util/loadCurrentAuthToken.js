import { AsyncStorage } from 'react-native'
import CURRENT_AUTH_TOKEN from './CURRENT_AUTH_TOKEN'

const loadCurrentAuthToken = async () =>
  AsyncStorage.getItem(CURRENT_AUTH_TOKEN)

export default loadCurrentAuthToken
