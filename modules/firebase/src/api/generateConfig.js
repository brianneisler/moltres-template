const generateConfig = (context) => (config) => ({
  ...config,
  firebase: {
    configs: {
      default: {
        serviceAccount: {
          type: 'service_account',
          project_id: context.get('FIREBASE_PROJECT_ID'),
          private_key_id: context.get('FIREBASE_PRIVATE_KEY_ID'),
          private_key: JSON.parse(context.get('FIREBASE_PRIVATE_KEY')),
          client_email: context.get('FIREBASE_CLIENT_EMAIL'),
          client_id: context.get('FIREBASE_CLIENT_ID'),
          auth_uri: 'https://accounts.google.com/o/oauth2/auth',
          token_uri: 'https://accounts.google.com/o/oauth2/token',
          auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
          client_x509_cert_url: context.get('FIREBASE_CLIENT_X509_CERT_URL')
        },
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
