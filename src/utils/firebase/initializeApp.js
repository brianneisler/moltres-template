const initializeApp = ({ config, firebase, namespace }) => {
  if (!firebase) {
    throw new TypeError(`No firebase library was provided`)
  }
  if (!namespace) {
    throw new TypeError(`No namespace was provided`)
  }
  if (!config.firebase) {
    throw new TypeError(`No firebase config was provided`)
  }

  return firebase.initializeApp(config.firebase, namespace)
}

export default initializeApp
