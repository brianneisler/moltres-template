import initializeGoogleCloudStorage from './initializeGoogleCloudStorage'

const module = (config) => ({
  setup: (store) => {
    const storage = initializeGoogleCloudStorage('default', config)
    store.setContext({
      storage
    })
    return store
  }
})

export default module
