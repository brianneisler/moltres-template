const generateConfig = (context) => (config) => ({
  ...config,
  firebase: {
    configs: {
      default: {
        apiKey: context.get('FIREBASE_API_KEY'),
        authDomain: `${context.get('FIREBASE_PROJECT_ID')}.firebaseapp.com`,
        databaseURL: `https://${context.get('FIREBASE_PROJECT_ID')}.firebaseio.com`,
        projectId: context.get('FIREBASE_PROJECT_ID'),
        storageBucket: `${context.get('FIREBASE_PROJECT_ID')}.appspot.com`,
        messagingSenderId: `${context.get('FIREBASE_MESSAGING_SENDER_ID')}`
      }
    },
    namespace: context.get('NAMESPACE')
  }
})

export default generateConfig
