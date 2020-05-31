import { AsyncStorage } from 'react-native'
import CURRENT_AUTH_TOKEN from './CURRENT_AUTH_TOKEN'

const saveCurrentAuthToken = async (token) => AsyncStorage.setItem(CURRENT_AUTH_TOKEN, token)

export default saveCurrentAuthToken
