import { setupSdkMethods } from './util'

const mod = () => {
  let sdk
  return {
    getSdk: () => {
      return sdk
    },
    setup: (store) => {
      sdk = setupSdkMethods(store)
    }
  }
}

export default mod
