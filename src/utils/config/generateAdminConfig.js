import { invariant } from '../lang'
import generateConfig from './generateConfig'
import generateProjectId from './generateProjectId'

const generateAdminConfig = (config = {}) => {
  invariant(config.stage, 'STAGE must be defined')
  let project_id = generateProjectId(config)
  if (!config.test && config.stage !== 'local') {
    invariant(
      process.env.FIREBASE_PROJECT_ID,
      'FIREBASE_PROJECT_ID must be defined when STAGE is NOT "local"'
    )
    invariant(
      process.env.FIREBASE_CLIENT_EMAIL,
      'FIREBASE_CLIENT_EMAIL must be defined when STAGE is NOT "local"'
    )
    invariant(
      process.env.FIREBASE_CLIENT_X509_CERT_URL,
      'FIREBASE_CLIENT_X509_CERT_URL must be defined when STAGE is NOT "local"'
    )
    invariant(
      process.env.FIREBASE_PRIVATE_KEY,
      'FIREBASE_PRIVATE_KEY must be defined when STAGE is NOT "local"'
    )
    invariant(
      process.env.FIREBASE_PRIVATE_KEY_ID,
      'FIREBASE_PRIVATE_KEY_ID must be defined when STAGE is NOT "local"'
    )
    project_id = process.env.FIREBASE_PROJECT_ID
  }
  return {
    ...generateConfig(config),
    serviceAccount: {
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      private_key: process.env.FIREBASE_PRIVATE_KEY
        ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
        : '',
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      project_id,
      token_uri: 'https://accounts.google.com/o/oauth2/token',
      type: 'service_account',
      ...config.serviceAccount
    }
  }
}

export default generateAdminConfig
