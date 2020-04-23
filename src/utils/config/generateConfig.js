import { invariant } from '../lang'
import { split } from '../data'
import generateProjectId from './generateProjectId'

// NOTE BRN: This is the config that is used on the server side.
// It is OK to have sensitive values here

const generateConfig = (config = {}) => {
  invariant(config.stage, 'STAGE must be defined')
  invariant(process.env.API_URL, 'API_URL must be defined')
  invariant(process.env.SITE_NAME, 'SITE_NAME must be defined')
  invariant(process.env.SITE_URL, 'SITE_URL must be defined')
  invariant(process.env.TWILIO_ACCOUNT_SID, 'TWILIO_ACCOUNT_SID must be defined')
  invariant(process.env.TWILIO_AUTH_TOKEN, 'TWILIO_AUTH_TOKEN must be defined')

  const projectId = generateProjectId(config)
  if (!config.test && config.stage !== 'local') {
    invariant(
      process.env.FIREBASE_PROJECT_ID,
      'FIREBASE_PROJECT_ID must be defined when STAGE is NOT "local"'
    )
    invariant(
      process.env.FIREBASE_API_KEY,
      'FIREBASE_API_KEY must be defined when STAGE is NOT "local"'
    )
    invariant(
      process.env.FIREBASE_MESSAGING_SENDER_ID,
      'FIREBASE_MESSAGING_SENDER_ID must be defined when STAGE is NOT "local"'
    )
    invariant(
      process.env.FIREBASE_PRIVATE_KEY,
      'FIREBASE_PRIVATE_KEY must be defined when STAGE is NOT "local"'
    )
    invariant(
      process.env.FIREBASE_PRIVATE_KEY_ID,
      'FIREBASE_PRIVATE_KEY_ID must be defined when STAGE is NOT "local"'
    )
  }
  return {
    ...config,
    api: {
      url: process.env.API_URL || ''
    },
    core: {
      debug: process.env.NODE_ENV === 'development'
    },
    facebook: {
      appId: process.env.FACEBOOK_APP_ID
    },
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: `${projectId}.firebaseapp.com`,
      databaseURL: `https://${projectId}.firebaseio.com`,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      projectId,
      storageBucket: `${projectId}.appspot.com`
    },
    gcloud: {
      databaseBackupBucket: process.env.GCLOUD_DATABASE_BACKUP_BUCKET
    },
    google: {
      analyticsId: process.GOOGLE_ANALYTICS_ID
    },
    site: {
      name: process.env.SITE_NAME,
      url: process.env.SITE_URL
    },
    sms: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      phoneNumbers: process.env.TWILIO_PHONE_NUMBERS
        ? split(',', process.env.TWILIO_PHONE_NUMBERS)
        : []
    },
    twitter: {
      username: process.env.TWITTER_USERNAME
    }
  }
}

export default generateConfig
