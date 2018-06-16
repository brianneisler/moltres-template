import firebase from 'firebase'
import { prop } from 'ramda'

const initializeFirebaseApp = (name, configs) => {
  const config = prop(name, configs)
  return firebase.initializeApp(config)
}

export default initializeFirebaseApp
