import { AsyncStorage } from 'react-native'

import CURRENT_AUTH_TOKEN from './CURRENT_AUTH_TOKEN'

const deleteCurrentAuthToken = async () =>
  AsyncStorage.removeItem(CURRENT_AUTH_TOKEN)

export default deleteCurrentAuthToken
