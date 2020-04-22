import * as testing from '@firebase/testing'

const initializeTestApp = ({ auth, config, namespace }) => {
  if (!namespace) {
    throw new TypeError(`No namespace was provided`)
  }
  if (!config.firebase) {
    throw new TypeError(`No firebase config was provided`)
  }

  return testing.initializeTestApp(
    {
      ...config.firebase,
      auth
    },
    namespace
  )
}

export default initializeTestApp
