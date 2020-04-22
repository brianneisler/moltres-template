import { split } from '../data'

// NOTE BRN: This is the config that is used on the server side.
// It is OK to have sensitive values here

const generateConfig = (config = {}) => {
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
      authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
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
      phoneNumbers: split(',', process.env.TWILIO_PHONE_NUMBERS)
    },
    twitter: {
      username: process.env.TWITTER_USERNAME
    }
  }
}

export default generateConfig
