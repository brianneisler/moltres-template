import firebase from 'firebase'
import { defn, prop } from 'moltres-utils'

const initializeApp = defn('initializeApp', ({ namespace, configs }) => {
  let config
  if (namespace) {
    config = prop(namespace, configs) || prop('default', configs)
  } else {
    config = prop('default', configs)
  }
  if (!config) {
    throw new Error(`No firebase config found for ${namespace} and no default config provided`)
  }

  const app = firebase.initializeApp(config, `app:${namespace || '[DEFAULT]'}`)
  const { database } = app
  app.database = (...args) => {
    const db = database.call(app, ...args)
    db.namespace = namespace
    return db
  }
  app.namespace = namespace
  return app
})

export default initializeApp
