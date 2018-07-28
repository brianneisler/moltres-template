const generateConfig = (setupConfig, options) => {
  const config = setupConfig(options)
  const { namespace } = options
  return {
    firebase: {
      configs: {
        default: {
          apiKey: config.get('FIREBASE_API_KEY'),
          authDomain: `${config.get('FIREBASE_PROJECT_ID')}.firebaseapp.com`,
          databaseURL: `https://${config.get('FIREBASE_PROJECT_ID')}.firebaseio.com`,
          projectId: config.get('FIREBASE_PROJECT_ID'),
          storageBucket: `${config.get('FIREBASE_PROJECT_ID')}.appspot.com`,
          messagingSenderId: `${config.get('FIREBASE_MESSAGING_SENDER_ID')}`
        }
      },
      namespace
    }
  }
}

export default generateConfig
