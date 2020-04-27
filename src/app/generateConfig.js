// NOTE BRN: This is the config that is used on the client side. Should only
// contain safe values here that are ok to expose to end users
import { generateProjectId } from '../utils/config'
import { invariant } from '../utils/lang'

const generateConfig = (config = {}) => {
  invariant(config.stage, 'STAGE must be defined')
  invariant(process.env.API_URL, 'API_URL must be defined')
  invariant(process.env.SITE_NAME, 'SITE_NAME must be defined')
  invariant(process.env.SITE_URL, 'SITE_URL must be defined')

  const projectId = generateProjectId(config)
  if (!config.test && config.stage !== 'local') {
    invariant(
      process.env.FIREBASE_PROJECT_ID,
      'FIREBASE_PROJECT_ID must be defined when STAGE is NOT "local"'
    )
    invariant(
      process.env.FIREBASE_APP_ID,
      'FIREBASE_APP_ID must be defined when STAGE is NOT "local"'
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
      appId: process.env.FIREBASE_APP_ID,
      authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      projectId,
      storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
    },
    sentry: {
      dsn: process.env.SENTRY_DSN
    },
    site: {
      name: process.env.SITE_NAME,
      url: process.env.SITE_URL
    },
    twitter: {
      username: process.env.TWITTER_USERNAME
    }
  }
}

export default generateConfig
