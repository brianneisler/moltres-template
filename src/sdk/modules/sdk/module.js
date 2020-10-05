import { setupCliProgram } from './util'

const mod = () => {
  let sdk
  return {
    getSdk: () => {
      return sdk
    },
    setup: (store) => {
      sdk = setupCliProgram(store)
    }
  }
}

export default mod
