const generateConfig = (setupConfig, options) => {
  const config = setupConfig(options)
  const { namespace } = options
  return {
    firebase: {
      configs: {
        default: {
          serviceAccount: {
            type: 'service_account',
            project_id: config.get('FIREBASE_PROJECT_ID'),
            private_key_id: config.get('FIREBASE_PRIVATE_KEY_ID'),
            private_key: JSON.parse(config.get('FIREBASE_PRIVATE_KEY')),
            client_email: config.get('FIREBASE_CLIENT_EMAIL'),
            client_id: config.get('FIREBASE_CLIENT_ID'),
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://accounts.google.com/o/oauth2/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url: config.get('FIREBASE_CLIENT_X509_CERT_URL')
          },
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
