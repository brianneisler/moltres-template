import generateConfig from './generateConfig'

const generateAdminConfig = (config = {}) => {
  return {
    ...generateConfig(config),
    serviceAccount: {
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      private_key: JSON.parse(process.env.FIREBASE_PRIVATE_KEY),
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      project_id: process.env.FIREBASE_PROJECT_ID,
      token_uri: 'https://accounts.google.com/o/oauth2/token',
      type: 'service_account'
    }
  }
}

export default generateAdminConfig
