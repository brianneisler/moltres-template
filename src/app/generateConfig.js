// NOTE BRN: This is the config that is used on the client side. Should only
// contain safe values here that are ok to expose to end users

const generateConfig = (config = {}) => ({
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
    projectId: process.env.FIREBASE_PROJECT_ID,
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
})

export default generateConfig
